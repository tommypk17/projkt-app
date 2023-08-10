import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriticalPathRoutingModule } from './critical-path-routing.module';
import { AoaComponent } from './pages/aoa/aoa.component';
import { AonComponent } from './pages/aon/aon.component';
import { CriticalPathNodeComponent } from './components/critical-path-node/critical-path-node.component';
import { CriticalPathGraphComponent } from './components/critical-path-graph/critical-path-graph.component';
import { CriticalPathTableComponent } from './components/critical-path-table/critical-path-table.component';

import {NgxEchartsModule} from "ngx-echarts";
import { SidebarModule } from 'primeng/sidebar';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import {MultiSelectModule} from "primeng/multiselect";
import { CriticalPathFormComponent } from './components/critical-path-form/critical-path-form.component';
import {InputNumberModule} from "primeng/inputnumber";

@NgModule({
  declarations: [
    AoaComponent,
    AonComponent,
    CriticalPathNodeComponent,
    CriticalPathGraphComponent,
    CriticalPathTableComponent,
    CriticalPathFormComponent
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
    InputTextModule,
    ButtonModule,
    MenuModule,
    OverlayPanelModule,
    DialogModule,
    TableModule,
    MultiSelectModule,
    InputNumberModule
  ]
})
export class CriticalPathModule { }
