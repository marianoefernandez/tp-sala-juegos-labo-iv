import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = 
[
  {
    path:"",redirectTo:"login",pathMatch:"full"
  },
  {
    path:'login',
    loadChildren: () => import('../login/login.module').then(modelos => modelos.LoginModule),
  },
  {
    path:'registro',
    loadChildren: () => import('../registro/registro.module').then(modelos => modelos.RegistroModule),
  },
  {
    path:'recuperar-clave',
    loadChildren: () => import('../recuperar-clave/recuperar-clave.module').then(modelos => modelos.RecuperarClaveModule)
  },
  {
    path:'validar-mail',
    loadChildren: () => import('../validar-mail/validar-mail.module').then(modelos => modelos.ValidarMailModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SesionesRoutingModule { }
