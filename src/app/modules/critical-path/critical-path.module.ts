import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriticalPathRoutingModule } from './critical-path-routing.module';
import { AoaComponent } from './pages/aoa/aoa.component';
import { AonComponent } from './pages/aon/aon.component';


@NgModule({
  declarations: [
    AoaComponent,
    AonComponent
  ],
  imports: [
    CommonModule,
    CriticalPathRoutingModule
  ]
})
export class CriticalPathModule { }
