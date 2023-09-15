import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import Usuario from '../../../clases/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {

  @ViewChild("container") public container!:ElementRef;

  public usuarios : any[] = JSON.parse(localStorage.getItem('Usuarios') || "[]")
  public nombre : string = ""
  public email : string = ""
  public clave : string = ""

  constructor(private renderer2:Renderer2,private router:Router)
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
    }
  }

  private verificarEmail() : Boolean
  {

    let retorno = false

    for(let i = 0; i < this.usuarios.length; i++)
    {
      if(this.email == this.usuarios[i].email)
      {
        retorno = true
        break;
      }
    }   
    return retorno; 
  }

  private verificarContraseña() : Boolean
  {

    let retorno = false

    for(let i = 0; i < this.usuarios.length; i++)
    {
      if(this.clave == this.usuarios[i].clave)
      {
        retorno = true
        break;
      }
    }    

    return retorno;
  }

  public registrarse() : Boolean
  {
    let retorno = false
   
    if (this.nombre != "" && this.email != "" && this.clave != "" && this.verificarEmail() == false)
    {
      this.usuarios.push(new Usuario(this.nombre,this.email,this.clave))
      localStorage.setItem("Usuarios", JSON.stringify(this.usuarios));
      retorno = true
    }

    return retorno
  }

  public prueba (prueba:string)
  {
    console.log(this.email + "-" + this.clave + "-" + this.nombre +  " acción: " + prueba)
  }

  public administrarSesion(accion:string) : void
  {
    accion == "login" ? (this.loguearse() ? console.log("Usuario: " + this.email + " logueado con éxito") : console.log("No se a podido loguear email no existente o clave incorrecta")) :
    ((this.registrarse() ? console.log("Usuario: " + this.email + " registrado con éxito") : console.log("No se a podido registrar el usuario. Puede que el mail ya este en uso o los datos esten vacios o mal escritos")));
  }

  public loguearse()
  {
    let retorno = false
    if(this.verificarEmail() && this.verificarContraseña())
    {
      retorno = true
    }
    console.log("Usuario " +  this.email + " Logueado: " + retorno)

    return retorno
  }
  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }




}
