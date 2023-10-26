import { Component, OnInit ,OnDestroy} from '@angular/core';
import { PreguntadosService } from 'src/app/servicios/preguntados.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import translate from 'google-translate-open-api';
import swal from 'sweetalert2';
import { time } from 'console';
import { title } from 'process';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})

export class PreguntadosComponent implements OnInit,OnDestroy{

  constructor(private preguntados:PreguntadosService, private spinner:NgxSpinnerService)
  {

  }

  public pregunta : string = "";
  public tematica : string = "";
  public respuestaCorrecta : string = "";
  public respuestas : Array<string> = [];
  public suscripcion!: Subscription;
  public suscripcionDos!: Subscription;
  public informacionTraducida:any = false;
  public puntuacion = 0;
  public vidas = 3;
  public volverAJugarBoton = true;
  public foto:string = "https://img.freepik.com/foto-gratis/textura-pintada-alivio_1194-6982.jpg";
  public palabraClave:string = "";

  async ngOnInit()
  {
    this.obtenerPregunta();
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

  ngOnDestroy()
  {
    this.suscripcion.unsubscribe();
    this.suscripcionDos.unsubscribe();
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

  public obtenerPregunta()
  {
    this.informacionTraducida = false;
    this.spinner.show();
    this.suscripcion = this.preguntados.obtenerPregunta().subscribe((respuesta: any)=>
      {
        let choice = respuesta["results"][0];
        let informacion = this.generarInformacion(choice);
        this.generarPregunta(informacion);
        
        this.suscripcionDos = this.preguntados.obtenerFoto(this.tematica).subscribe((respuesta:any)=>
        {
          let indice = Math.floor(Math.random() * (9 - 0)) + 0;
          this.foto = respuesta["results"][indice]["urls"]["regular"];
          this.spinner.hide();            
        });    
      });
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
}

