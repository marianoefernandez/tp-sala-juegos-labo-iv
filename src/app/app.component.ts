import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner'
import { AutenticacionService } from './servicios/autenticacion.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template: ` <app-home [emailUsuario]="a"></app-home> `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tp-sala-juegos-labo-iv';

  constructor(private router:Router,private spinner:NgxSpinnerService,private autenticador:AutenticacionService) 
  {
    
  }

  public cargoDatos : Boolean = false;

  async ngOnInit()
  {
    const observable = this.autenticador.obtenerUsuarioLogueado()
    let usuarioActual = await firstValueFrom(observable);
    if (usuarioActual != null)
    {
      if(this.router.url == "/login" || this.router.url == "/registro" || this.router.url == "/validar-email")
      {
        if (usuarioActual.emailVerified)
        {
          this.navigate("home");
        }
      }

      console.log("Usuario logueado " + usuarioActual.email);
    }
    else
    {
      if(this.router.url != "/login" && this.router.url != "/registro")
      {
        this.navigate("login");
      }
      console.log("Usuario no está logueado");
    }
    this.cargoDatos = true;
  }

  public cargando()
  {
    this.spinner.show();
    setTimeout(()=>
    {
      this.spinner.hide();
    },1000)
  }

  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }
}
