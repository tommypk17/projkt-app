import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AoaComponent} from "./pages/aoa/aoa.component";
import {AonComponent} from "./pages/aon/aon.component";

const routes: Routes = [
  { path: 'aoa', component: AoaComponent },
  { path: 'aon', component: AonComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriticalPathRoutingModule { }
