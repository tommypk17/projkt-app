import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CocomoRoutingModule } from './cocomo-routing.module';
import { CocomoComponent } from './pages/cocomo/cocomo.component';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {FieldsetModule} from "primeng/fieldset";
import {InputNumberModule} from "primeng/inputnumber";
import { CocomoResultsComponent } from './components/cocomo-results/cocomo-results.component';
import {MessagesModule} from "primeng/messages";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
  declarations: [
    CocomoComponent,
    CocomoResultsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CocomoRoutingModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    FieldsetModule,
    InputNumberModule,
    MessagesModule,
    OverlayPanelModule,
    InputTextModule
  ]
})
export class CocomoModule { }
