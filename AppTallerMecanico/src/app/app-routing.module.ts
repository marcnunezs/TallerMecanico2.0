import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ComunicacionesComponent } from './components/comunicaciones/comunicaciones.component';
import { AuthGuard } from './guards/auth.guard';
import { GestionCatalogoComponent } from './components/gestion-catalogo/gestion-catalogo.component';
import { SolicitarServicioComponent } from './components/solicitar-servicio/solicitar-servicio.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  { 
    path: 'home', 
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'rec-pass',
    loadChildren: () => import('./pages/rec-pass/rec-pass.module').then( m => m.RecPassPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'communications',
    component: ComunicacionesComponent, 
    canActivate: [AuthGuard] 
  },
  {
    path: 'catalog',
    component: GestionCatalogoComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'solicitar-servicio',
    component: SolicitarServicioComponent, 
    canActivate: [AuthGuard] 
  },






  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
