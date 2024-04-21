import { Component, OnInit ,OnDestroy, ElementRef, ViewChild, Renderer2} from '@angular/core';
import { PreguntadosService } from 'src/app/servicios/preguntados.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, firstValueFrom } from 'rxjs';
import swal from 'sweetalert2';
import { TraductorService } from 'src/app/servicios/traductor.service';
import { ModoNocturnoService } from 'src/app/servicios/modo-nocturno.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})

export class PreguntadosComponent implements OnInit,OnDestroy
{

  @ViewChild("pagina") public pagina!:ElementRef;

  constructor(private preguntados:PreguntadosService, private spinner:NgxSpinnerService, private traductor:TraductorService,private renderer2:Renderer2,private modo:ModoNocturnoService)
  {
    modo.$emisor.subscribe(()=>
    {
      this.cambiarModo()
    })
  }

  public pregunta : string = "";
  public preguntas : any = [];
  public tematica : string = "";
  public respuestaCorrecta : string = "";
  public respuestas : Array<string> = [];
  public suscripcion!: Subscription;
  public suscripcionDos!: Subscription;
  public puntuacion = 0;
  public vidas = 3;
  public volverAJugarBoton = true;
  public foto:string = "https://img.freepik.com/foto-gratis/textura-pintada-alivio_1194-6982.jpg";
  public palabraClave:string = "";

  async ngOnInit()
  {
    if(this.modo.modoNocturno)
    {
      setTimeout(() => {
        this.renderer2.addClass(this.pagina.nativeElement,"modo-nocturno")        
      }, 1);
    }
    this.obtenerPregunta();
  }

  ngOnDestroy()
  {
    this.suscripcion.unsubscribe();
    this.suscripcionDos.unsubscribe();
  }

  public generarInformacion(choice:any)
  {
    this.respuestas = [];
    let informacion : string;
    informacion = choice["question"];
    informacion += "\n" + choice["category"];
    informacion += "\n" + choice["correct_answer"];
    let respuestas = this.guardarRespuestas(choice);
    for(let i = 0;i<4;i++)
    {
      informacion += "\n" + respuestas[i];
    }

    return this.decodeHTMLEntities(informacion);
  }

  decodeHTMLEntities(text:string) 
  {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  public guardarRespuestas(choice:any)
  {
    let respuestas : Array<string> = choice["incorrect_answers"];
    respuestas.push(choice["correct_answer"]);
    respuestas.sort(function() { return Math.random() - 0.5 });
    return respuestas;
  }

  public generarPregunta(informacion:string)
  {
    let arrayDeCadenas = informacion.split("\n");
    this.pregunta = arrayDeCadenas[0];
    this.tematica = arrayDeCadenas[1];
    this.respuestaCorrecta = arrayDeCadenas[2];
    for(let i=3;i<7;i++)
    {
      this.respuestas.push(arrayDeCadenas[i]);
    }
  }

  public async obtenerPreguntas()
  {
    return firstValueFrom(this.preguntados.obtenerPreguntas());
  }

  public async obtenerPregunta()
  {
    setTimeout(async () => {
      this.spinner.show();

      if(this.preguntas.length == 0)
      {
        this.preguntas = await this.obtenerPreguntas();
        this.preguntas = this.preguntas["results"];
      }

      let choice = this.preguntas[0];
      let informacion = this.generarInformacion(choice);
      let tematicaIngles = choice["category"];
      let informacionTraducida = await this.traductor.traducir(informacion);
      
      if(informacionTraducida != null)
      {
        this.generarPregunta(informacionTraducida);
      }
      else
      {
        this.generarPregunta(informacion);
      }
      
      this.suscripcionDos = this.preguntados.obtenerFoto(tematicaIngles).subscribe((respuesta:any)=>
      {
        let indice = Math.floor(Math.random() * (9 - 0)) + 0;
        this.foto = respuesta["results"][indice]["urls"]["regular"];
        this.spinner.hide();            
    });   
    }, 500);
  }


  public async jugar(opcion:number)
  {
    if(this.respuestas[opcion] == this.respuestaCorrecta)
    {
      this.puntuacion+=100;
    }
    else
    {
      this.vidas -= 1
    }

    if (this.vidas == 0)
    {
      swal.fire(
      {
        title:"Juego terminado",
        text:"Has obtenido: " + this.puntuacion + " puntos",
        showCancelButton:true,
        showConfirmButton:true,
        confirmButtonText:"Volver a jugar",
        cancelButtonText:"Salir"
      }
      ).then(async (respuesta)=>
      {
        if(respuesta.isConfirmed)
        {
          await this.rejugar();
        }
        else
        {
          this.volverAJugarBoton = false;
        }
      })
    }
    else
    {
      this.preguntas.splice(0,1);
      this.obtenerPregunta();
    }
  }

  public async rejugar()
  {
    this.volverAJugarBoton = true;
    this.vidas = 3;
    this.puntuacion = 0;
    await this.obtenerPregunta();
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

