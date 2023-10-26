import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidarMailRoutingModule } from './validar-mail-routing.module';
import { ValidarMailComponent } from './validar-mail.component';


@NgModule({
  declarations: [ValidarMailComponent],
  imports: [
    CommonModule,
    ValidarMailRoutingModule
  ]
})
export class ValidarMailModule { }
