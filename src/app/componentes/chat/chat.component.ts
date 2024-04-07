import {Component, ElementRef, Renderer2, ViewChild,OnInit} from '@angular/core';
import { Chat } from './chat';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { NgxSpinnerService} from 'ngx-spinner'
import { Subscription } from 'rxjs';
import { ModoNocturnoService } from 'src/app/servicios/modo-nocturno.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit{

  @ViewChild("pagina") public pagina!:ElementRef;
  
  public mensajes: Array<Chat> = [];
  public mensajeNuevo:string = "";
  public emailUsuario:string = this.autenticador.usuarioActual.email;
  public suscripcion!: Subscription;

  constructor(private autenticador:AutenticacionService,private renderer2:Renderer2,private firestore:FirestoreService,private spinner:NgxSpinnerService,private modo:ModoNocturnoService)
  {
    modo.$emisor.subscribe(()=>
    {
      this.cambiarModo()
    })
  }

  ngOnInit()
  {
    this.spinner.show();
    this.suscripcion = this.firestore.obtenerMensajes().subscribe(mensajes=>
      {
        for(let i = 0;i<mensajes.length;i++)
        {
          this.mensajes.push(mensajes[i])
        }
        this.spinner.hide();
      })

    if(this.modo.modoNocturno)
    {
      setTimeout(() => {
        this.renderer2.addClass(this.pagina.nativeElement,"modo-nocturno")        
      }, 1);
    }
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

  public cambiarModo()
  {
    if(this.modo.modoNocturno)
    {
      this.renderer2.addClass(this.pagina.nativeElement,"modo-nocturno")
    }
    else
    {
      this.renderer2.removeClass(this.pagina.nativeElement,"modo-nocturno")
    }  
  }

}
