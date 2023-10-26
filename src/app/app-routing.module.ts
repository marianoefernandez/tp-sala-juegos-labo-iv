import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';
import { estaLogueadoGuard } from './guards/esta-logueado.guard';
import { noEstaLogueadoGuard } from './guards/no-esta-logueado.guard';

const routes: Routes = [
  {
    path:"",redirectTo:"sesiones",pathMatch:"full"
  },
  {
    path:"sesiones",
    loadChildren: ()=>import('./componentes/sesiones/sesiones.module').then(modulo => modulo.SesionesModule),
    canActivate:[noEstaLogueadoGuard]
  },
  {
    path:"principal",
    loadChildren: ()=>import('./componentes/principal/principal.module').then(modulo => modulo.PrincipalModule),
    canActivate:[estaLogueadoGuard]
  },
  {
    path:"error",
    component:ErrorComponent
  },
  {
    path:"**", redirectTo:"error"
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
