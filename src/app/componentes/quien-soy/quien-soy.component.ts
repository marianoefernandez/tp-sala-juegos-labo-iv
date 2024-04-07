import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ModoNocturnoService } from 'src/app/servicios/modo-nocturno.service';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})
export class QuienSoyComponent 
{

  @ViewChild("pagina") public pagina!:ElementRef;


  constructor(private modo:ModoNocturnoService,private renderer2:Renderer2)
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
