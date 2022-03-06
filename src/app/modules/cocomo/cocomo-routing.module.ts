import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CocomoComponent} from "./pages/cocomo/cocomo.component";

const routes: Routes = [{ path: '', component: CocomoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocomoRoutingModule { }
