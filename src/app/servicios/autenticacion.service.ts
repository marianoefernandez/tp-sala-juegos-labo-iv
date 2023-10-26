import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, map } from 'rxjs';
import { Firestore, collection, addDoc, onSnapshot } from '@angular/fire/firestore';

import  firebase  from 'firebase/compat/app';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private autenticador: AngularFireAuth, private firestore: FirestoreService) { }

  public usuarioActual:any|null =null;

  
  async registro(email:string,contraseña:string)
  {
    try
    {
      const usuario = await this.autenticador.createUserWithEmailAndPassword(email,contraseña);
      usuario.user?.sendEmailVerification()
      const usuarioInfo =
      {
        uid: usuario.user?.uid,
        email: usuario.user?.email,
        fechaRegistro: new Date().toLocaleString(),
        nombreDeUsuario:"" //En desarrollo -> Próxima versión 
      }
      console.log(this.firestore.agregarInformacionUsuario(usuarioInfo));
      return usuario;
    }
    catch(error:any)
    {      
      return error.code;
    }
  }

  async login(email:string,contraseña:string)
  {
    try
    {
      return await this.autenticador.signInWithEmailAndPassword(email,contraseña);
    }
    catch(error:any)
    {
      return error.code;
    }
  }

  async loginConGoogle(email:string,contraseña:string)
  {
    try
    {
      return await this.autenticador.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    catch(error)
    {
      console.log("Error en google con google", error);
      return false;
    }
  }

  obtenerUsuarioLogueado()
  {
    return this.autenticador.authState;
  }

  cerrarSesion()
  {
    return this.autenticador.signOut();
  }

}
