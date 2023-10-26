import {Component, ElementRef, Renderer2, ViewChild,OnInit} from '@angular/core';
import { Chat } from './chat';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import {NgxSpinner, NgxSpinnerService} from 'ngx-spinner'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit{
  
  public mensajes: Array<Chat> = [];
  public mensajeNuevo:string = "";
  public emailUsuario:string = this.autenticador.usuarioActual.email;
  public suscripcion!: Subscription;

  constructor(private autenticador:AutenticacionService,private renderer2:Renderer2,private firestore:FirestoreService,private spinner:NgxSpinnerService)
  {
    
  }

  ngOnInit()
  {
    let ahora = new Date();
    this.spinner.show();
    this.suscripcion = this.firestore.obtenerMensajes().subscribe(mensajes=>
      {
        for(let i = 0;i<mensajes.length;i++)
        {
          this.mensajes.push(mensajes[i])
        }
        this.spinner.hide();
      })
  }

  ngDestroy()
  {
    this.suscripcion.unsubscribe();
  }

  public enviarMensaje()
  {
    if (this.mensajeNuevo != "")
    {
      const mensaje: Chat = {
        mensaje: this.mensajeNuevo,
        usuarioEmail: this.emailUsuario,
        hora: new Date()
      };
      this.firestore.agregarMensajeChat(mensaje);
      this.mensajeNuevo = "";
    }
  }

  

}
