import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './pages/settings/settings.component';
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SettingsRoutingModule,
    CardModule,
    InputTextModule,
    CalendarModule
  ]
})
export class SettingsModule { }
