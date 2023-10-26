import { Component, OnInit } from '@angular/core';
import { Ahorcado } from './ahorcado';
import swal from'sweetalert2';

const temas = 
[
  "Matematicas",
  "Deportes",
  "Geografia",
  "Ciencia",
  "Historia",
  "Peliculas",
  "Musica",
  "Alimentos",
  "Tecnologia",
  "Animales"
];

const palabrasPorTema = {
  "Matematicas": ["algebra", "geometria", "calculo", "trigonometria", "fracciones"],
  "Deportes": ["futbol", "baloncesto", "tenis", "beisbol", "natacion"],
  "Geografia": ["continente", "pais", "ciudad", "rio", "montana"],
  "Ciencia": ["quimica", "biologia", "fisica", "astronomia", "experimento"],
  "Historia": ["revolucion", "imperio", "guerra", "explorador", "civilizacion"],
  "Peliculas": ["actor", "director", "pelicula", "personaje", "escena"],
  "Musica": ["cancion", "banda", "instrumento", "compositor", "melodia"],
  "Alimentos": ["fruta", "verdura", "carne", "pescado", "bebida"],
  "Tecnologia": ["computadora", "smartphone", "software", "internet", "programacion"],
  "Animales": ["mamifero", "reptil", "ave", "insecto", "anfibio"]
};



@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  public letrasJuego : any = [
    {'a': true},
    {'b': true},
    {'c': true},
    {'d': true},
    {'e': true},
    {'f': true},
    {'g': true},
    {'h': true},
    {'i': true},
    {'j': true},
    {'k': true},
    {'l': true},
    {'m': true},
    {'n': true},
    {'ñ': true},
    {'o': true},
    {'p': true},
    {'q': true},
    {'r': true},
    {'s': true},
    {'t': true},
    {'u': true},
    {'v': true},
    {'w': true},
    {'x': true},
    {'y': true},
    {'z': true}
] 

  constructor()
  {

  }


  public juego:Ahorcado = new Ahorcado(temas,palabrasPorTema);

  ngOnInit() 
  {

  }

  public devolverLetra(indice:number)
  {
    return Object.keys(this.letrasJuego[indice])[0];
  }

  public rejugar()
  {
    this.juego.reiniciar();
    this.letrasJuego = 
    [
        {'a': true},
        {'b': true},
        {'c': true},
        {'d': true},
        {'e': true},
        {'f': true},
        {'g': true},
        {'h': true},
        {'i': true},
        {'j': true},
        {'k': true},
        {'l': true},
        {'m': true},
        {'n': true},
        {'ñ': true},
        {'o': true},
        {'p': true},
        {'q': true},
        {'r': true},
        {'s': true},
        {'t': true},
        {'u': true},
        {'v': true},
        {'w': true},
        {'x': true},
        {'y': true},
        {'z': true}
    ] 
  }

  public jugar(letraIndice:number)
  {
    if(this.juego.estadoJuego)
    {
      let letraIngresada = this.devolverLetra(letraIndice);
      if(this.juego.jugar(letraIngresada) == 1)
      {
        this.letrasJuego[letraIndice][letraIngresada] = false;
      }
      else
      {
        this.letrasJuego= 
        [
          {'a': true},
          {'b': true},
          {'c': true},
          {'d': true},
          {'e': true},
          {'f': true},
          {'g': true},
          {'h': true},
          {'i': true},
          {'j': true},
          {'k': true},
          {'l': true},
          {'m': true},
          {'n': true},
          {'ñ': true},
          {'o': true},
          {'p': true},
          {'q': true},
          {'r': true},
          {'s': true},
          {'t': true},
          {'u': true},
          {'v': true},
          {'w': true},
          {'x': true},
          {'y': true},
          {'z': true}
        ] 
      }
      if(!this.juego.estadoJuego)
      {
        swal.fire({
          title: '¡Juego terminado!',
          text:'Has obtenido ' + this.juego.puntuacion + " puntos!",
          icon:'success',
          showDenyButton: true,
          confirmButtonText: 'Volver a Jugar',
          denyButtonText: `Salir`,
        }).then(resultado =>
          {
            if(resultado.isConfirmed) 
            {
              this.rejugar();
            }
          }
        )
      }
    }
  }
}
