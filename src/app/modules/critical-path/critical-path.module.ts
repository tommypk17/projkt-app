import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriticalPathRoutingModule } from './critical-path-routing.module';
import { AoaComponent } from './pages/aoa/aoa.component';
import { AonComponent } from './pages/aon/aon.component';
import { CriticalPathNodeComponent } from './components/critical-path-node/critical-path-node.component';
import { CriticalPathGraphComponent } from './components/critical-path-graph/critical-path-graph.component';

@NgModule({
  declarations: [
    AoaComponent,
    AonComponent,
    CriticalPathNodeComponent,
    CriticalPathGraphComponent
  ],
  imports: [
    CommonModule,
    CriticalPathRoutingModule
  ]
})
export class CriticalPathModule { }
