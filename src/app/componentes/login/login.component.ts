import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {AutenticacionService} from '../../servicios/autenticacion.service'
import {NgxSpinnerService} from 'ngx-spinner'
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  @ViewChild("container") public container!:ElementRef;

  //public usuarios : any[] = JSON.parse(localStorage.getItem('Usuarios') || "[]")
  public nombreUsuario : string = "";
  public email : string = "";
  public clave : string = "";
  public mensajeError : string = "";

  constructor(private renderer2:Renderer2,private router:Router,private autenticador:AutenticacionService, private spinner:NgxSpinnerService)
  {

  }

  public cambiarPanel(estado:string)
  {
    if (estado == "signUp")
    {
      this.renderer2.addClass(this.container.nativeElement,"right-panel-active");
      setTimeout(() =>{
        this.navigate("sesiones/registro");
      },500)
    }
    else
    {
      this.renderer2.removeClass(this.container.nativeElement,"right-panel-active");
    }
  }

  public loguearse()
  {
    this.spinner.show()  
    this.autenticador.login(this.email,this.clave).then(respuesta => {
      setTimeout(async () =>{

        if(typeof respuesta != "string")
        {
          if (respuesta.user?.emailVerified)
          {
            const observable = this.autenticador.obtenerUsuarioLogueado();
            this.autenticador.usuarioActual = await firstValueFrom(observable);
            this.navigate("principal");
          }
          else
          {
            this.autenticador.cerrarSesion();
            this.mensajeError = "Email no se ha verificado todavia";
            setTimeout(() => {
              this.mensajeError = "";
            }, 2000);
          }
        }
        else
        {
          this.mostrarError(respuesta);
          setTimeout(() => {
            this.mensajeError = "";
          }, 2000);
        }
        this.spinner.hide();
      },500)
    })
  }

  public accesoRapido()
  {
    this.email = "marification66@gmail.com";
    this.clave = "123456";
    this.loguearse()
  }

  public mostrarError(error:string)
  {
    switch(error)
    {
      case "auth/invalid-email":
        this.mensajeError = 'El formato de correo es invalido';
        break;
      case "auth/operation-not-allowed":
        this.mensajeError = "Operación no permitida"
        break;
      default:
        this.mensajeError = 'El usuario o contraseña no son correctos. Por favor verifique los datos.'
    }

    if (this.email == "" || this.clave == "")
    {
      this.mensajeError = "El campo email o contraseña están vacios por favor ingrese sus datos";
    }

    if (this.email == "")
    {
      this.mensajeError = "El campo email está vació. Por favor ingrese su mail";
    }
  }

  /*
  public async cargando(segundos:number)
  {
    this.spinner.show();
    setTimeout(()=>
    {
      this.spinner.hide();
    },segundos)
  }
  */
  
  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }
}
 