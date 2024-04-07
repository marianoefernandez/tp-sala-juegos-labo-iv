import { Component , OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { ModoNocturnoService } from 'src/app/servicios/modo-nocturno.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit
{

  public fotoUsuario:string | null = null;
  public emailUsuario:string | null = null;

  constructor(private router:Router,private cookieService: CookieService,public modo:ModoNocturnoService , public autenticador:AutenticacionService,private spinner:NgxSpinnerService)
  {

  }

  public ngOnInit()
  {
    if(this.cookieService.check("modo-nocturno"))
    {
      if(this.cookieService.get("modo-nocturno") == "true")
      {
        this.modo.modoNocturno = true
      }
    }
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

  public cambiarModo()
  {
    this.modo.cambiarModo()
    this.modo.emitirEvento()
    
    if(this.modo.modoNocturno)
    {
      this.cookieService.set("modo-nocturno","true")
    }
    else
    {
      this.cookieService.set("modo-nocturno","false")
    }
  }

  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }
}
