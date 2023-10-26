import { CommonModule } from '@angular/common';
import { RecuperarClaveRoutingModule } from './recuperar-clave-routing.module';
import { RecuperarClaveComponent } from './recuperar-clave.component';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [RecuperarClaveComponent],
  imports: [
    CommonModule,
    RecuperarClaveRoutingModule
  ]
})
export class RecuperarClaveModule { }
