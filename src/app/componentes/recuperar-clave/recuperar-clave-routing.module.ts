import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecuperarClaveComponent } from './recuperar-clave.component';

const routes: Routes = 
[
  {
    path:'',
    component: RecuperarClaveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecuperarClaveRoutingModule { }
