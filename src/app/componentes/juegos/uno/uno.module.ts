import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnoRoutingModule } from './uno-routing.module';
import { UnoComponent } from './uno.component';


@NgModule({
  declarations: [UnoComponent],
  imports: [
    CommonModule,
    UnoRoutingModule
  ]
})
export class UnoModule { }
