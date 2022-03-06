import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CocomoRoutingModule } from './cocomo-routing.module';
import { CocomoComponent } from './pages/cocomo/cocomo.component';


@NgModule({
  declarations: [
    CocomoComponent
  ],
  imports: [
    CommonModule,
    CocomoRoutingModule
  ]
})
export class CocomoModule { }
