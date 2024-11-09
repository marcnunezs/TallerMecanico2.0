import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard'; 
import { Pagina404Page } from './pagina404/pagina404.page';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [authGuard], 
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'rec-pass',
    loadChildren: () => import('./rec-pass/rec-pass.module').then(m => m.RecPassPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: '**',
    component: Pagina404Page
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
