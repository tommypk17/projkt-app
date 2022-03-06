import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CardModule,
    ButtonModule
  ]
})
export class HomeModule { }
