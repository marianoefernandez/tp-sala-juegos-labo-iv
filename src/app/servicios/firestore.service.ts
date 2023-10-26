import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot } from '@angular/fire/firestore';
import { Chat } from '../componentes/chat/chat';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor(private firestore: Firestore) { }

  private mensajes = collection(this.firestore,'mensajes');
  private usuarios = collection(this.firestore,"usuarios");

  agregarInformacionUsuario(usuario:any)
  {
    try
    {
      return addDoc(this.usuarios,usuario);
    }
    catch(error:any)
    {
      console.log(error.code);
      return null;
    }
  }

  agregarMensajeChat(chat:Chat)
  {
    try
    {
      return addDoc(this.mensajes,chat);
    }
    catch(error:any)
    {
      console.log(error.code);
      return null;
    }
  }

  hardcodearMensajes()
  {
    setTimeout(() => {
      const mensajeUno: Chat = {
        mensaje: "Hola a todos",
        usuarioEmail: "a@hotmail.com",
        hora: new Date()
      };
      this.agregarMensajeChat(mensajeUno);
    }, 1000);
    setTimeout(() => {
      const mensajeDos: Chat = {
        mensaje: "Un gusto",
        usuarioEmail: "g@hotmail.com",
        hora: new Date()
      };
      this.agregarMensajeChat(mensajeDos);
      
    }, 2000);
    setTimeout(() => {
      const mensajeTres: Chat = {
        mensaje: "Buenas noches",
        usuarioEmail: "r@hotmail.com",
        hora: new Date()
      };
      this.agregarMensajeChat(mensajeTres);
    }, 3000);
  }

  obtenerMensajes(): Observable<Chat[]> {
    return new Observable<Chat[]>((observable) => {
      onSnapshot(this.mensajes, (snap) => {
        const mensajes: Chat[] = [];
        snap.docChanges().forEach(x => {
          const msj = x.doc.data() as Chat;
          mensajes.push(msj);
        });
        const mensajesOrdenados = mensajes.sort(function(chatUno,chatDos)
        {
          return chatUno.hora.seconds - chatDos.hora.seconds;
        });
        observable.next(mensajesOrdenados);
      });
    });
  }

}