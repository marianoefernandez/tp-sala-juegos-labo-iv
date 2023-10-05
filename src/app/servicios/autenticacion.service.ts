import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import  firebase  from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private autenticador: AngularFireAuth, private firestore: AngularFirestore) { }
  
  async registro(email:string,contraseña:string)
  {
    try
    {
      const usuario = await this.autenticador.createUserWithEmailAndPassword(email,contraseña);
      usuario.user?.sendEmailVerification()
      /*
      this.firestore.collection("usuarios").doc(usuario.user?.uid).set(
      {
        uid: usuario.user?.uid,
        email: usuario.user?.email,
        fechaRegistro: new Date().toLocaleString(),
        nombreDeUsuario:"" //En desarrollo -> Próxima versión
      }).then(function(){
        console.log("Usuario registrado con exito");
        usuario.user?.sendEmailVerification()
      })
      */
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
