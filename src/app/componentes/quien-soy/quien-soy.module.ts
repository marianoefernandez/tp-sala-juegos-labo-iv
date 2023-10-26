import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuienSoyRoutingModule } from './quien-soy-routing.module';
import { QuienSoyComponent } from './quien-soy.component';


@NgModule({
  declarations: [QuienSoyComponent],
  imports: [
    CommonModule,
    QuienSoyRoutingModule
  ]
})
export class QuienSoyModule { }
