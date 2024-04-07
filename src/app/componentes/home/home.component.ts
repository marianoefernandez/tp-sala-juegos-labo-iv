import { Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AutenticacionService} from '../../servicios/autenticacion.service'
import { Router } from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner'
import { ModoNocturnoService } from 'src/app/servicios/modo-nocturno.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  
})
export class HomeComponent implements OnInit{

  @ViewChild("pagina") public pagina!:ElementRef;

  constructor(private renderer2:Renderer2, private modo:ModoNocturnoService, private router:Router,private autenticador:AutenticacionService,private spinner:NgxSpinnerService)
  {  
    modo.$emisor.subscribe(()=>
    {
      this.cambiarModo()
    })
  }

  async ngOnInit() 
  {
    if(this.modo.modoNocturno)
    {
      setTimeout(() => {
        this.renderer2.addClass(this.pagina.nativeElement,"modo-nocturno")        
      }, 1);
    }
  }

  public usuarioLogueado = this.autenticador.obtenerUsuarioLogueado();

  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
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
