import { Component , ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, filter } from 'rxjs';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit
{
  public fotoUsuario:string | null = null;
  public emailUsuario:string | null = null;

  constructor(private router:Router,public autenticador:AutenticacionService,private spinner:NgxSpinnerService)
  {

  }

  public ngOnInit()
  {

  }

  public async cerrarSesion()
  {
    this.spinner.show();
    setTimeout(async ()=>
    {
      this.spinner.hide();
      await this.autenticador.cerrarSesion();
      this.navigate("sesiones/login");
    },1000)
  }

  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }

  

  

}
