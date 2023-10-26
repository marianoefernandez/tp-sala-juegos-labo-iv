import { Component } from '@angular/core';
import {AutenticacionService} from '../../servicios/autenticacion.service'
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-validar-mail',
  templateUrl: './validar-mail.component.html',
  styleUrls: ['./validar-mail.component.css']
})
export class ValidarMailComponent 
{

  constructor(private autenticador : AutenticacionService,private router:Router, private spinner:NgxSpinnerService)
  {

  }

  public usuarioLogueado = this.autenticador.obtenerUsuarioLogueado();

  public async verificarMail()
  {
    try
    {
      this.spinner.show()

      setTimeout(() =>
      {
        this.navigate("home");
        this.spinner.hide()
      },1000)
    }
    catch(error)
    {
      console.log("Error");
    }

  }

  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }

  
}
