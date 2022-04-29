import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import {AuthorizationRoutingModule} from "./authorization-routing.module";
import {CardModule} from "primeng/card";



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,

    CardModule
  ]
})
export class AuthorizationModule { }
