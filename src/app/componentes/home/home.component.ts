import { Component, OnInit} from '@angular/core';
import {AutenticacionService} from '../../servicios/autenticacion.service'
import { Router } from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner'
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  
})
export class HomeComponent implements OnInit{

  constructor(private router:Router,private autenticador:AutenticacionService,private spinner:NgxSpinnerService)
  {  

  }

  async ngOnInit() 
  {
    const observable = this.autenticador.obtenerUsuarioLogueado()
    let usuarioActual = await firstValueFrom(observable);
    if(usuarioActual?.emailVerified == false)
    {
      this.navigate("validar-email");
    }
  }

  public usuarioLogueado = this.autenticador.obtenerUsuarioLogueado();

  public async cerrarSesion()
  {
    this.spinner.show();
    setTimeout(()=>
    {
      this.spinner.hide();
      this.autenticador.cerrarSesion();
      this.navigate("login");
    },1000)
  }

  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }
}
