import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarMailComponent } from './validar-mail.component';

const routes: Routes = 
[
  {
    path:'',
    component: ValidarMailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidarMailRoutingModule { }
