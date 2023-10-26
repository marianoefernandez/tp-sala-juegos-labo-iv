import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RegistroRoutingModule } from './registro-routing.module';

import { RegistroComponent } from './registro.component';


@NgModule({
  declarations: [RegistroComponent],
  imports: [
    CommonModule,
    FormsModule,
    RegistroRoutingModule
  ]
})
export class RegistroModule { }
