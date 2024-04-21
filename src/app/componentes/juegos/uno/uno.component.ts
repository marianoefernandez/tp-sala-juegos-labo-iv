import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Carta } from './carta';
import {NgxSpinnerService } from 'ngx-spinner';
import swal from'sweetalert2';
import { ModoNocturnoService } from 'src/app/servicios/modo-nocturno.service';

@Component({
  selector: 'app-uno',
  templateUrl: './uno.component.html',
  styleUrls: ['./uno.component.css']
})
export class UnoComponent implements OnInit {

  @ViewChild("pagina") public pagina!:ElementRef;


  constructor(private spinner:NgxSpinnerService, private renderer2:Renderer2,private modo:ModoNocturnoService)
  {
    modo.$emisor.subscribe(()=>
    {
      this.cambiarModo()
    })
  }

  public cartasMazo:Array<Carta> = 
  [
    new Carta("azul","giro",-2,"./assets/uno/_B.png","./assets/uno/card_back.png"),
    new Carta("azul","giro",-2,"./assets/uno/_B.png","./assets/uno/card_back.png"),
    new Carta("verde","giro",-2,"./assets/uno/_G.png","./assets/uno/card_back.png"),
    new Carta("verde","giro",-2,"./assets/uno/_G.png","./assets/uno/card_back.png"),
    new Carta("rojo","giro",-2,"./assets/uno/_R.png","./assets/uno/card_back.png"),
    new Carta("rojo","giro",-2,"./assets/uno/_R.png","./assets/uno/card_back.png"),
    new Carta("amarillo","giro",-2,"./assets/uno/_Y.png","./assets/uno/card_back.png"),
    new Carta("amarillo","giro",-2,"./assets/uno/_Y.png","./assets/uno/card_back.png"),
    new Carta("azul","bloqueo",-3,"./assets/uno/skipB.png","./assets/uno/card_back.png"),
    new Carta("azul","bloqueo",-3,"./assets/uno/skipB.png","./assets/uno/card_back.png"),
    new Carta("verde","bloqueo",-3,"./assets/uno/skipG.png","./assets/uno/card_back.png"),
    new Carta("verde","bloqueo",-3,"./assets/uno/skipG.png","./assets/uno/card_back.png"),
    new Carta("rojo","bloqueo",-3,"./assets/uno/skipR.png","./assets/uno/card_back.png"),
    new Carta("rojo","bloqueo",-3,"./assets/uno/skipR.png","./assets/uno/card_back.png"),
    new Carta("amarillo","bloqueo",-3,"./assets/uno/skipY.png","./assets/uno/card_back.png"),
    new Carta("amarillo","bloqueo",-3,"./assets/uno/skipY.png","./assets/uno/card_back.png"),
    new Carta("azul","+2",-4,"./assets/uno/D2B.png","./assets/uno/card_back.png"),
    new Carta("azul","+2",-4,"./assets/uno/D2B.png","./assets/uno/card_back.png"),
    new Carta("verde","+2",-4,"./assets/uno/D2G.png","./assets/uno/card_back.png"),
    new Carta("verde","+2",-4,"./assets/uno/D2G.png","./assets/uno/card_back.png"),
    new Carta("rojo","+2",-4,"./assets/uno/D2R.png","./assets/uno/card_back.png"),
    new Carta("rojo","+2",-4,"./assets/uno/D2R.png","./assets/uno/card_back.png"),
    new Carta("amarillo","+2",-4,"./assets/uno/D2Y.png","./assets/uno/card_back.png"),
    new Carta("amarillo","+2",-4,"./assets/uno/D2Y.png","./assets/uno/card_back.png"),
    new Carta("todos","+4",-4,"./assets/uno/D4W.png","./assets/uno/card_back.png"),
    new Carta("todos","+4",-4,"./assets/uno/D4W.png","./assets/uno/card_back.png"),
    new Carta("todos","+4",-4,"./assets/uno/D4W.png","./assets/uno/card_back.png"),
    new Carta("todos","+4",-4,"./assets/uno/D4W.png","./assets/uno/card_back.png"),
    new Carta("todos","+4",-4,"./assets/uno/D4W.png","./assets/uno/card_back.png"),
    new Carta("todos","+4",-4,"./assets/uno/D4W.png","./assets/uno/card_back.png"),
    new Carta("todos","cambio",-1,"./assets/uno/W.png","./assets/uno/card_back.png"),
    new Carta("todos","cambio",-1,"./assets/uno/W.png","./assets/uno/card_back.png"),
    new Carta("todos","cambio",-1,"./assets/uno/W.png","./assets/uno/card_back.png"),
    new Carta("todos","cambio",-1,"./assets/uno/W.png","./assets/uno/card_back.png"),
    new Carta("todos","cambio",-1,"./assets/uno/W.png","./assets/uno/card_back.png"),
    new Carta("todos","cambio",-1,"./assets/uno/W.png","./assets/uno/card_back.png"),
    new Carta("azul","normal",0,"./assets/uno/0B.png","./assets/uno/card_back.png"),
    new Carta("azul","normal",0,"./assets/uno/0B.png","./assets/uno/card_back.png"),
    new Carta("azul","normal",1,"./assets/uno/1B.png","./assets/uno/card_back.png"),
    new Carta("azul","normal",1,"./assets/uno/1B.png","./assets/uno/card_back.png"),
    new Carta("azul","normal",2,"./assets/uno/2B.png","./assets/uno/card_back.png"),
    new Carta("azul","normal",2,"./assets/uno/2B.png","./assets/uno/card_back.png"),   
    new Carta("azul","normal",3,"./assets/uno/3B.png","./assets/uno/card_back.png"),   
    new Carta("azul","normal",3,"./assets/uno/3B.png","./assets/uno/card_back.png"),   
    new Carta("azul","normal",4,"./assets/uno/4B.png","./assets/uno/card_back.png"),   
    new Carta("azul","normal",4,"./assets/uno/4B.png","./assets/uno/card_back.png"),   
    new Carta("azul","normal",5,"./assets/uno/5B.png","./assets/uno/card_back.png"),   
    new Carta("azul","normal",5,"./assets/uno/5B.png","./assets/uno/card_back.png"),   
    new Carta("azul","normal",6,"./assets/uno/6B.png","./assets/uno/card_back.png"),   
    new Carta("azul","normal",6,"./assets/uno/6B.png","./assets/uno/card_back.png"),   
    new Carta("azul","normal",7,"./assets/uno/7B.png","./assets/uno/card_back.png"),   
    new Carta("azul","normal",7,"./assets/uno/7B.png","./assets/uno/card_back.png"),   
    new Carta("azul","normal",8,"./assets/uno/8B.png","./assets/uno/card_back.png"),   
    new Carta("azul","normal",8,"./assets/uno/8B.png","./assets/uno/card_back.png"),   
    new Carta("azul","normal",9,"./assets/uno/9B.png","./assets/uno/card_back.png"),   
    new Carta("azul","normal",9,"./assets/uno/9B.png","./assets/uno/card_back.png"),   
    new Carta("rojo","normal",0,"./assets/uno/0R.png","./assets/uno/card_back.png"),
    new Carta("rojo","normal",0,"./assets/uno/0R.png","./assets/uno/card_back.png"),
    new Carta("rojo","normal",1,"./assets/uno/1R.png","./assets/uno/card_back.png"),
    new Carta("rojo","normal",1,"./assets/uno/1R.png","./assets/uno/card_back.png"),
    new Carta("rojo","normal",2,"./assets/uno/2R.png","./assets/uno/card_back.png"),
    new Carta("rojo","normal",2,"./assets/uno/2R.png","./assets/uno/card_back.png"),   
    new Carta("rojo","normal",3,"./assets/uno/3R.png","./assets/uno/card_back.png"),   
    new Carta("rojo","normal",3,"./assets/uno/3R.png","./assets/uno/card_back.png"),   
    new Carta("rojo","normal",4,"./assets/uno/4R.png","./assets/uno/card_back.png"),   
    new Carta("rojo","normal",4,"./assets/uno/4R.png","./assets/uno/card_back.png"),   
    new Carta("rojo","normal",5,"./assets/uno/5R.png","./assets/uno/card_back.png"),   
    new Carta("rojo","normal",5,"./assets/uno/5R.png","./assets/uno/card_back.png"),   
    new Carta("rojo","normal",6,"./assets/uno/6R.png","./assets/uno/card_back.png"),   
    new Carta("rojo","normal",6,"./assets/uno/6R.png","./assets/uno/card_back.png"),   
    new Carta("rojo","normal",7,"./assets/uno/7R.png","./assets/uno/card_back.png"),   
    new Carta("rojo","normal",7,"./assets/uno/7R.png","./assets/uno/card_back.png"),   
    new Carta("rojo","normal",8,"./assets/uno/8R.png","./assets/uno/card_back.png"),   
    new Carta("rojo","normal",8,"./assets/uno/8R.png","./assets/uno/card_back.png"),   
    new Carta("rojo","normal",9,"./assets/uno/9R.png","./assets/uno/card_back.png"),   
    new Carta("rojo","normal",9,"./assets/uno/9R.png","./assets/uno/card_back.png"),   
    new Carta("verde","normal",0,"./assets/uno/0G.png","./assets/uno/card_back.png"),
    new Carta("verde","normal",0,"./assets/uno/0G.png","./assets/uno/card_back.png"),
    new Carta("verde","normal",1,"./assets/uno/1G.png","./assets/uno/card_back.png"),
    new Carta("verde","normal",1,"./assets/uno/1G.png","./assets/uno/card_back.png"),
    new Carta("verde","normal",2,"./assets/uno/2G.png","./assets/uno/card_back.png"),
    new Carta("verde","normal",2,"./assets/uno/2G.png","./assets/uno/card_back.png"),   
    new Carta("verde","normal",3,"./assets/uno/3G.png","./assets/uno/card_back.png"),   
    new Carta("verde","normal",3,"./assets/uno/3G.png","./assets/uno/card_back.png"),   
    new Carta("verde","normal",4,"./assets/uno/4G.png","./assets/uno/card_back.png"),   
    new Carta("verde","normal",4,"./assets/uno/4G.png","./assets/uno/card_back.png"),   
    new Carta("verde","normal",5,"./assets/uno/5G.png","./assets/uno/card_back.png"),   
    new Carta("verde","normal",5,"./assets/uno/5G.png","./assets/uno/card_back.png"),   
    new Carta("verde","normal",6,"./assets/uno/6G.png","./assets/uno/card_back.png"),   
    new Carta("verde","normal",6,"./assets/uno/6G.png","./assets/uno/card_back.png"),   
    new Carta("verde","normal",7,"./assets/uno/7G.png","./assets/uno/card_back.png"),   
    new Carta("verde","normal",7,"./assets/uno/7G.png","./assets/uno/card_back.png"),   
    new Carta("verde","normal",8,"./assets/uno/8G.png","./assets/uno/card_back.png"),   
    new Carta("verde","normal",8,"./assets/uno/8G.png","./assets/uno/card_back.png"),   
    new Carta("verde","normal",9,"./assets/uno/9G.png","./assets/uno/card_back.png"),   
    new Carta("verde","normal",9,"./assets/uno/9G.png","./assets/uno/card_back.png"),   
    new Carta("amarillo","normal",0,"./assets/uno/0Y.png","./assets/uno/card_back.png"),
    new Carta("amarillo","normal",0,"./assets/uno/0Y.png","./assets/uno/card_back.png"),
    new Carta("amarillo","normal",1,"./assets/uno/1Y.png","./assets/uno/card_back.png"),
    new Carta("amarillo","normal",1,"./assets/uno/1Y.png","./assets/uno/card_back.png"),
    new Carta("amarillo","normal",2,"./assets/uno/2Y.png","./assets/uno/card_back.png"),
    new Carta("amarillo","normal",2,"./assets/uno/2Y.png","./assets/uno/card_back.png"),   
    new Carta("amarillo","normal",3,"./assets/uno/3Y.png","./assets/uno/card_back.png"),   
    new Carta("amarillo","normal",3,"./assets/uno/3Y.png","./assets/uno/card_back.png"),   
    new Carta("amarillo","normal",4,"./assets/uno/4Y.png","./assets/uno/card_back.png"),   
    new Carta("amarillo","normal",4,"./assets/uno/4Y.png","./assets/uno/card_back.png"),   
    new Carta("amarillo","normal",5,"./assets/uno/5Y.png","./assets/uno/card_back.png"),   
    new Carta("amarillo","normal",5,"./assets/uno/5Y.png","./assets/uno/card_back.png"),   
    new Carta("amarillo","normal",6,"./assets/uno/6Y.png","./assets/uno/card_back.png"),   
    new Carta("amarillo","normal",6,"./assets/uno/6Y.png","./assets/uno/card_back.png"),   
    new Carta("amarillo","normal",7,"./assets/uno/7Y.png","./assets/uno/card_back.png"),   
    new Carta("amarillo","normal",7,"./assets/uno/7Y.png","./assets/uno/card_back.png"),   
    new Carta("amarillo","normal",8,"./assets/uno/8Y.png","./assets/uno/card_back.png"),   
    new Carta("amarillo","normal",8,"./assets/uno/8Y.png","./assets/uno/card_back.png"),   
    new Carta("amarillo","normal",9,"./assets/uno/9Y.png","./assets/uno/card_back.png"),   
    new Carta("amarillo","normal",9,"./assets/uno/9Y.png","./assets/uno/card_back.png"),  
  ];

  cartasJugadas:Array<Carta> = [];
  cartasJugador:Array<Carta> = [];
  cartasOponente:Array<Carta> = [];
  cartaActual!: Carta;
  turnoActual:string = "Jugador";
  turnoBool:boolean = false;
  estadoJuego:boolean = true;
  cuentaCartas:number = 0;
  puntuacion:number = 0;

  ngOnInit()
  {
    if(this.modo.modoNocturno)
    {
      setTimeout(() => {
        this.renderer2.addClass(this.pagina.nativeElement,"modo-nocturno")        
      }, 1);
    }
    this.mezclarMazo();
    this.repartirCartas();
    this.obtenerPrimerCarta();
  }

  public reiniciarJuego()
  {
    this.estadoJuego = true;
    this.turnoBool = false;
    this.turnoActual = "Jugador";
    this.cartasJugador = [];
    this.cartasOponente = [];
    this.mezclarMazo();
    this.repartirCartas();
    this.obtenerPrimerCarta();
  }

  public mezclarMazo()
  {
    this.cartasMazo.sort(function() { return Math.random() - 0.5 });
  }

  public repartirCartas()
  {
    for(let i=0;i<7;i++)
    {
      this.cartasJugador.push(this.cartasMazo.pop()!);
      this.cartasOponente.push(this.cartasMazo.pop()!);
    }
  }

  public obtenerPrimerCarta()
  {
    let arrayAux : Array<Carta> = [];
    let cartaAux: Carta;
    while(true)
    {
      cartaAux = this.cartasMazo.pop()!;
      if(cartaAux.tipo == "normal")
      {
        this.cartaActual = cartaAux;
        break;
      }
      arrayAux.push(cartaAux); 
    }
    this.cartasJugadas.push(this.cartaActual);
    if(arrayAux.length)
    {
      this.cartasMazo = this.cartasMazo.concat(arrayAux);
    }
  }

  public obtenerColorIA()
  {
    let contadores = [0,0,0,0];
    let maximo;
    let indiceMaximo;
    let retorno = "rojo";

    for(let i = 0;i<this.cartasOponente.length;i++)
    {
      switch(this.cartasOponente[i].color)
      {
        case "rojo":
          contadores[0]++;
          break;
        case "verde":
          contadores[1]++;
          break;
        case "amarillo":
          contadores[2]++;
          break;
        case "azul":
          contadores[3]++;
          break;
      }
    }

    maximo = Math.max(contadores[0],contadores[1],contadores[2],contadores[3]);
    indiceMaximo = contadores.indexOf(maximo);
    
    switch(indiceMaximo)
    {
      case 1:
        retorno = "verde";
        break;
      case 2:
        retorno = "amarillo";
        break;
      case 3:
        retorno = "azul";
    }

    return retorno;
  }

  public verificarEspecialJugador()
  {
    let bandera = true;
    for(let i = 0;i<this.cartasJugador.length;i++)
    {
      if((this.cartasJugador[i].tipo == "+4" || this.cartasJugador[i].tipo == "+2"))
      {
        bandera = false;
        break;
      }
    }

    return bandera && this.cuentaCartas;
  }

  public async jugarOponente()
  {
    let indices: number[] = []
    let indicesEspeciales:number[] = [];

    for(let i=0;i<this.cartasOponente.length;i++)
    {
      if(this.verificarJugada(this.cartasOponente[i]))
      {
        indices.push(i);
      }
      if(this.cartasOponente[i].tipo == "+4" || this.cartasOponente[i].tipo == "+2")
      {
        indicesEspeciales.push(i);
      }
    }

    if(indices.length)
    {
      if(this.cuentaCartas)
      {
        if(indicesEspeciales.length)
        {
          indicesEspeciales.sort(function() { return Math.random() - 0.5 });
          indices = indicesEspeciales;
        }
        else
        {
          await swal.fire
          (
            {
              title:"El rival no tiene ni +4 ni +2",
              text:"El rival pierde " + this.cuentaCartas + " cartas",
              showConfirmButton:true
            }
          )
          this.spinner.show();
          setTimeout(() => {
            this.sacarCarta(this.cuentaCartas);
            this.cuentaCartas = 0;
            this.spinner.hide();
          }, 350); 
        }
      }
      else
      {
        indices.sort(function() { return Math.random() - 0.5 });
      }

      setTimeout(() => {
        this.spinner.show();
        this.cartasJugadas.push(this.cartasOponente[indices[0]]);
        this.cartaActual = this.cartasOponente[indices[0]];
        this.cartasOponente.splice(indices[0],1);

        if(this.cartaActual.tipo == "+2")
        {
          this.cuentaCartas+=2;
        }
        else
        {
          if(this.cartaActual.tipo == "+4")
          {
            this.cuentaCartas+=4;
          }
        }

        if(this.cartaActual.tipo == "cambio" || this.cartaActual.tipo == "+4")
        {
          this.cartaActual.color = this.obtenerColorIA();
        }

        if(this.cartasOponente.length == 0)
        {
          setTimeout(() => {
            this.spinner.hide();
            swal.fire(
              {
                title:'Perdiste!',
                text:"Has perdido la partida",
                icon:'error'
              }
            )
            this.estadoJuego = false;
            this.turnoBool = true;
            this.cartasMazo = this.cartasMazo.concat(this.cartasJugadas);
            this.cartasMazo = this.cartasMazo.concat(this.cartasJugador);
            this.puntuacion = 0;
          }, 350);
        }
        else
        {
          setTimeout(async () => {
            this.spinner.hide();
            if(this.verificarEspecialJugador())
            {
              await swal.fire
              (
                {
                  title:"No tenes +4 ni +2",
                  text:"El jugador pierde " + this.cuentaCartas + " cartas",
                  showConfirmButton:true
                }
              )
              this.terminarTurno();
              for(let i = 0; i<this.cuentaCartas;i++)
              {
                this.cartasJugador.push(this.cartasMazo.pop()!);
              }              
              this.cuentaCartas = 0;
            }
            else
            {
              this.terminarTurno();
              if(this.cartaActual.tipo == "giro" || this.cartaActual.tipo == "bloqueo")
              {
                await swal.fire
                (
                  {
                    title:"Bloqueo/Giro",
                    text:"El rival tiro un bloqueo o un giro por ende vuelve a tener turno"
                  }
                )
                this.terminarTurno();
                this.jugarOponente();
              }
            }
          }, 350);
        }
      }, Math.floor((Math.random() * (2000 - 1000 + 1)) + 1000));
    }
    else
    {
      setTimeout(() => {
        this.sacarCarta(1);        
        this.terminarTurno();
      }, Math.floor((Math.random() * (2000 - 1000 + 1)) + 1000));
    }
  }

  public terminarTurno()
  {
    if(this.turnoActual == "Jugador")
    {
      this.turnoActual = "Oponente";
      this.turnoBool = true;
    }
    else
    {
      this.turnoActual = "Jugador";
      this.turnoBool = false;
    }
  }

  public async cambiarColor()
  {
    return swal.fire
        (
          {
            title:"Cambio de color",
            text:"¿Qué color desea elegir?",
            background:"#E7DAD7",
            showConfirmButton:true,
            showCancelButton:true,
            showDenyButton:true,
            confirmButtonText:'Azul',
            cancelButtonText:'Otro',
            denyButtonText:'Rojo',
          }
        ).then((async respuesta=>
        {
          if(respuesta.isConfirmed)
          {
            this.cartaActual.color = "azul";
          }
          else
          {
            if(respuesta.isDenied)
            {
              this.cartaActual.color = "rojo";
            }
            else
            {
            await swal.fire
              (
                {
                  title:"Cambio de color",
                  text:"¿Qué color desea elegir?",
                  background:	"#E7DAD7",
                  showConfirmButton:true,
                  showCancelButton:true,
                  showDenyButton:true,
                  confirmButtonText:'Amarillo',
                  cancelButtonText:'Otro',
                  denyButtonText:'Verde',
                  confirmButtonColor:"#FFFF00",
                  denyButtonColor:"#008000"
                }
              ).then((async respuesta =>
                {
                  if(respuesta.isConfirmed)
                  {
                    this.cartaActual.color = "amarillo";
                  }
                  else
                  {
                    if(respuesta.isDenied)
                    {
                      this.cartaActual.color = "verde";
                    }
                    else
                    {
                      await this.cambiarColor();
                    }
                  }
                }))
            }
          }
        }))
  }

  public async jugar(indiceCarta:number)
  {
    if(this.verificarJugada(this.cartasJugador[indiceCarta]))
    {
      this.cartasJugadas.push(this.cartasJugador[indiceCarta]);
      this.cartaActual = this.cartasJugador[indiceCarta];
      this.cartasJugador.splice(indiceCarta,1);
      if(this.cartaActual.tipo == "cambio" || this.cartaActual.tipo == "+4")
      {
        await this.cambiarColor();
      }

      if(this.cartaActual.tipo == "+2")
      {
        this.cuentaCartas += 2;
      }
      if(this.cartaActual.tipo == "+4")
      {
        this.cuentaCartas += 4;
      }

      this.spinner.show();
      if(this.cartasJugador.length == 0)
      {
        setTimeout(() => {
          this.spinner.hide();
          swal.fire(
            {
              title:'¡Ganaste!',
              text:"Has ganado el juego",
              icon:'success'
            }
          )
          this.estadoJuego = false;
          this.turnoBool = true;
          this.cartasMazo = this.cartasMazo.concat(this.cartasJugadas);
          this.cartasMazo = this.cartasMazo.concat(this.cartasOponente);
          this.puntuacion +=1;
        }, 350);
      }
      else
      {
        this.terminarTurno();
        setTimeout(async () => {
          this.spinner.hide();
          if(this.cartaActual.tipo == "giro" || this.cartaActual.tipo == "bloqueo")
          {
            await swal.fire
            (
              {
                title:"Bloqueo/Giro",
                text:"El jugador tiro un bloqueo o un giro por ende vuelve a tener turno"
              }
            )
            this.terminarTurno();
          }
          else
          {
            this.jugarOponente();
          }
        }, 350);
      }
    }
  }

  public verificarJugada(carta:Carta)
  {
    return  carta.color == this.cartaActual.color || carta.valor == this.cartaActual.valor || carta.tipo == "+4" || carta.tipo == "cambio";
  }

  public sacarCarta(cantidad:number)
  {
    if(this.cartasMazo.length - cantidad == 0)
    {
      this.cartasMazo = this.cartasMazo.concat(this.cartasJugadas);
      this.mezclarMazo();
    }

    if(this.turnoActual == "Jugador")
    {
      this.terminarTurno();
      for(let i = 0; i<cantidad;i++)
      {
        this.cartasJugador.push(this.cartasMazo.pop()!);
      }
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.jugarOponente();
      }, 350);
    }
    else
    {
      for(let i = 0; i<cantidad;i++)
      {
        this.cartasOponente.push(this.cartasMazo.pop()!);
      }
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
