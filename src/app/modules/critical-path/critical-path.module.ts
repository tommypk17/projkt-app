import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriticalPathRoutingModule } from './critical-path-routing.module';
import { AoaComponent } from './pages/aoa/aoa.component';
import { AonComponent } from './pages/aon/aon.component';
import { CriticalPathNodeComponent } from './components/critical-path-node/critical-path-node.component';
import { CriticalPathGraphComponent } from './components/critical-path-graph/critical-path-graph.component';
import {NgxEchartsModule} from "ngx-echarts";
import { SidebarModule } from 'primeng/sidebar';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AoaComponent,
    AonComponent,
    CriticalPathNodeComponent,
    CriticalPathGraphComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CriticalPathRoutingModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    SidebarModule,
    InputTextModule
  ]
})
export class CriticalPathModule { }
