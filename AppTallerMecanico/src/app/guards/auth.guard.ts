import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      map(loggedIn => {
        console.log('Estado de autenticación: ', loggedIn);
        if (!loggedIn) {
          console.log('Usuario no autenticado, redirigiendo a login');
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
