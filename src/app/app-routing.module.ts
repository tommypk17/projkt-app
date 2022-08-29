import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'cocomo', loadChildren: () => import('./modules/cocomo/cocomo.module').then(m => m.CocomoModule) },
  { path: 'critical-path', loadChildren: () => import('./modules/critical-path/critical-path.module').then(m => m.CriticalPathModule) },
  { path: 'auth', loadChildren: () => import('./modules/authorization/authorization.module').then(m => m.AuthorizationModule) },
  { path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
