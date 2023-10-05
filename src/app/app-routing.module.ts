import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { ErrorComponent } from './componentes/error/error.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { RecuperarClaveComponent } from './componentes/recuperar-clave/recuperar-clave.component';
import { ValidarMailComponent } from './componentes/validar-mail/validar-mail.component';

const routes: Routes = [
  {
    path:"",redirectTo:"login",pathMatch:"full"
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"registro",
    component:RegistroComponent
  },
  {
    path:'quien-soy',
    component:QuienSoyComponent
  },
  {
    path:'recuperar-clave',
    component:RecuperarClaveComponent
  },
  {
    path:'validar-email',
    component:ValidarMailComponent
  },
  {
    path:'error',
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
