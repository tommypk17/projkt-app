import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationComponent} from "./components/navigation/navigation.component";
import {ButtonModule} from "primeng/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TieredMenuModule} from "primeng/tieredmenu";
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import {SharedService} from "../services/shared.service";
import {ProgressBarModule} from "primeng/progressbar";



@NgModule({
  declarations: [NavigationComponent, LoadingBarComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,

    ButtonModule,
    TieredMenuModule,
    ProgressBarModule
  ],
  providers: [SharedService],
  exports: [
    NavigationComponent,
    LoadingBarComponent
  ]
})
export class SharedModule { }
