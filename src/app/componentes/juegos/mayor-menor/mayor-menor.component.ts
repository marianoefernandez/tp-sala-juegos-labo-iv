import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import {firstValueFrom } from 'rxjs';
import { MayorMenorService } from 'src/app/servicios/mayor-menor.service';
import { MayorMenor } from './mayor-menor';
import swal from'sweetalert2';
import { ModoNocturnoService } from 'src/app/servicios/modo-nocturno.service';



@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {

  @ViewChild("pagina") public pagina!:ElementRef;

  constructor(private mayorMenor:MayorMenorService,private modo:ModoNocturnoService,private renderer2:Renderer2)
  {
    modo.$emisor.subscribe(()=>
    {
      this.cambiarModo()
    })
  }

  public juego!: MayorMenor;
  public imagenCarta = null;
  public imagenCartaAnterior = null;
  public imagenOculta = "https://www.deckofcardsapi.com/static/img/back.png";
  public btnLabel = "Empezar partida";
  public mostrarPuntuacion = true;
  public puntuacionFinal = 0;
  public fondoJuego = "#b7b4b7"
  public letraColor = "black"

  async ngOnInit()
  {
    
    if(this.modo.modoNocturno)
    {
      setTimeout(() => {
        this.renderer2.addClass(this.pagina.nativeElement,"modo-nocturno")
        this.fondoJuego = "#000000"    
        this.letraColor = "white" 
      }, 1);
    }

    let mazo = await this.generarMazo();
    this.juego = new MayorMenor(mazo);
    this.juego.carta = await this.barajarCarta();
  }

  public cambiarModo()
  {
    if(this.modo.modoNocturno)
    {
      this.renderer2.addClass(this.pagina.nativeElement,"modo-nocturno")
      this.fondoJuego = "#000000"    
      this.letraColor = "white"
    }
    else
    {
      this.renderer2.removeClass(this.pagina.nativeElement,"modo-nocturno")
      this.fondoJuego = "#b7b4b7"
      this.letraColor = "black"
    }  
  }

  public async inicializarJuego()
  {
    let mazo = await this.generarMazo();
    this.juego = new MayorMenor(mazo);
    this.juego.carta = await this.barajarCarta();  
    this.juego.puntuacion = 0;
    this.juego.estadoJuego = true;
  }

  public async barajarCarta()
  {
    return firstValueFrom(this.mayorMenor.obtenerCarta(this.juego.mazo["deck_id"]));
  }

  public async generarMazo()
  {
    const observable = this.mayorMenor.generarMazo()
    let mazo = await firstValueFrom(observable);
    return mazo;
  }

  public async jugar()
  {
    if(this.juego.carta != null)
    {
      this.juego.cartaAnterior = this.juego.carta;
      this.juego.carta = await firstValueFrom(this.mayorMenor.obtenerCarta(this.juego.mazo["deck_id"]));
      console.log(this.juego.cartaAnterior);
      console.log(this.juego.carta);
      await this.mostrarMensaje();
      this.juego.jugar();
      await this.mostrarEstadoJuego();
    }
    //this.mostrarMensaje();
  }

  public terminarJuego()
  {
    swal.fire({
      title: 'Juego terminado',
      text:'Has obtenido :' + this.juego.puntuacion + ' puntos',
      color:this.letraColor,
      showConfirmButton:true,
      showDenyButton: true,
      confirmButtonText: 'Volver a jugar',
      background:this.fondoJuego,
      denyButtonText: `Salir`,
    }).then(async (result) => {
      if (result.isConfirmed) 
      {
        await this.inicializarJuego();
        this.jugar();
      } 
      else if (result.isDenied) 
      {
        await this.inicializarJuego();
      }
      else
      {
        this.terminarJuego();
      }
    })
  }

  public cambiarImagenes()
  {
    this.imagenCarta = this.juego.carta["cards"][0]["image"];
    this.imagenCartaAnterior = this.juego.cartaAnterior["cards"][0]["image"];
  }

  public mostrarMensaje()
  {
    console.log("Hola mostrar mensaje");
    this.cambiarImagenes();
    console.log(this.fondoJuego)

    return swal.fire({
          title: '<h1 style="color:'  + this.letraColor + '" >Mayor o Menor: <h1>',
          html:
            '<h3 style="color:'  + this.letraColor + '" >Puntaje:' + this.juego.puntuacion +  '<h3>' + 
            '<img src="'+ this.imagenOculta +'" style="width: 200px" >, ' +
            '<img src="'+ this.imagenCartaAnterior +'" style="width: 200px" >," ',
          background : this.fondoJuego,
          showDenyButton: true,
          confirmButtonText: 'Mayor',
          denyButtonText: `Menor`,
        }).then((respuesta) => {
          /* Read more about isConfirmed, isDenied below */
          if (respuesta.isConfirmed) 
          {
            console.log("Eligio mayor");
            this.juego.seleccionJugador = "mayor";
          } 
          else if (respuesta.isDenied)
          {
            console.log("Eligio menor")
            this.juego.seleccionJugador = "menor";
          }
          else
          {
            this.mostrarMensaje();
          }
        })
  }

  public async mostrarEstadoJuego()
  {
    this.cambiarImagenes();

    let valorCarta = this.juego.determinarValor(this.juego.carta);
    let valorCartaAnterior = this.juego.determinarValor(this.juego.cartaAnterior);

    let mensaje = "Perdió";
    if(this.juego.estadoJuego)
    {
      mensaje = "Ha adivinado";
      if(valorCarta == valorCartaAnterior)
      {
        mensaje = "Las cartas eran iguales por lo que sigue jugando sin sumar puntos";
      }
    }

    return swal.fire({
          title: '<h1 style="color:' + this.letraColor +'" >' + mensaje + ': <h1>',
          html:
            '<h3 style="color: ' + this.letraColor +'" >Puntaje:' + this.juego.puntuacion +  '<h3>' + 
            '<img src="'+ this.imagenCarta +'" style="width: 200px" >, ' +
            '<img src="'+ this.imagenCartaAnterior +'" style="width: 200px" >," ',
          background:this.fondoJuego,
          confirmButtonText: 'Ok',
        }).then((respuesta) => {
          /* Read more about isConfirmed, isDenied below */
          if (respuesta.isConfirmed) 
          {
            if(this.juego.estadoJuego)
            {
              this.jugar();
            }
            else
            {
              this.btnLabel = "Volver a jugar";
              this.mostrarPuntuacion = false;
              this.puntuacionFinal = this.juego.puntuacion;
              this.terminarJuego();
            }
          } 
          else
          {
            this.mostrarEstadoJuego();
          }
        })
  }
}
