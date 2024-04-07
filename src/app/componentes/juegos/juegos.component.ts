import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModoNocturnoService } from 'src/app/servicios/modo-nocturno.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent {

  @ViewChild("pagina") public pagina!:ElementRef;


  constructor(private router:Router,private modo:ModoNocturnoService,private renderer2:Renderer2)
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
