import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'rec-pass',
    loadChildren: () => import('./rec-pass/rec-pass.module').then( m => m.RecPassPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentComponent } from './pages/parent/parent.component';
import { Child1Component } from './pages/parent/child1/child1.component';
import { Child2Component } from './pages/parent/child2/child2.component';

const routes: Routes = [
  {
    path: 'parent',
    component: ParentComponent,
    children: [
      { path: 'child1', component: Child1Component },
      { path: 'child2', component: Child2Component },
    ],
  },
  { path: '', redirectTo: 'parent', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
