import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos.component';

const routes: Routes = 
[
  {
    path:"",
    component : JuegosComponent
  },
  {
    path:"ahorcado",
    loadChildren: ()=>import('./ahorcado/ahorcado.module').then(modulo => modulo.AhorcadoModule)
  },
  {
    path:"mayor-menor",
    loadChildren: ()=>import('./mayor-menor/mayor-menor.module').then(modulo => modulo.MayorMenorModule)
  },
  {
    path:"preguntados",
    loadChildren: ()=>import('./preguntados/preguntados.module').then(modulo => modulo.PreguntadosModule)
  },
  {
    path:"uno",
    loadChildren: ()=>import('./uno/uno.module').then(modulo => modulo.UnoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
