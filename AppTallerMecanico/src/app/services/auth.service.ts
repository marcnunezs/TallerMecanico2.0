import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Usuario autenticado', userCredential.user);
      return true;
    } catch (error) {
      console.error('Error en la autenticación: ', error);
      alert('Credentiales incorrectas.');
      return false;
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user)
    )
  }
}
