import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {AutenticacionService} from '../../servicios/autenticacion.service'
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent 
{
  @ViewChild("container") public container!:ElementRef;

  public usuarios : any[] = JSON.parse(localStorage.getItem('Usuarios') || "[]")
  public nombre : string = ""
  public email : string = ""
  public clave : string = ""
  public mensajeError : string = ""

  constructor(private renderer2:Renderer2,private router:Router, private autenticador:AutenticacionService, private spinner:NgxSpinnerService)
  {

  }

  public cambiarPanel(estado:string)
  {
    if (estado == "signUp")
    {
      this.renderer2.addClass(this.container.nativeElement,"right-panel-active")
    }
    else
    {
      this.renderer2.removeClass(this.container.nativeElement,"right-panel-active")
      setTimeout(() =>{
        this.navigate("login")
      },500)
    }
  }

  public registro()
  {
    this.autenticador.registro(this.email,this.clave).then(respuesta => {
      this.spinner.show();
      setTimeout(() => {
        if(typeof respuesta != "string")
        {
          console.log("Registrado con éxito: " + this.email);
          this.navigate("validar-email");
        }
        else
        {
          this.mostrarError(respuesta)//Acá iria el mensaje en la vista
        }
        this.spinner.hide()
      }, 500)
    }) 
  }

  public mostrarError(error:string)
  {
    switch(error)
    {
      case "auth/email-already-in-use":
        this.mensajeError = 'El correo ya está registrado, prueba con otro';
        break;
      case "auth/invalid-email":
        this.mensajeError = 'El formato de correo es invalido';
        break;
      case "auth/operation-not-allowed":
        this.mensajeError = "Operación no permitida"
        break;
      case "auth/weak-password":
        this.mensajeError = "La contraseña es muy pequeña, deberia ser de al menos 6 caracteres."
    }
  }

  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }
}
