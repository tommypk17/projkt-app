import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationComponent} from "./components/navigation/navigation.component";
import {ButtonModule} from "primeng/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TieredMenuModule} from "primeng/tieredmenu";



@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,

    ButtonModule,
    TieredMenuModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class SharedModule { }
