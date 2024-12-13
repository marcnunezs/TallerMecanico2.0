import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router 
  ) { this.setAuthPersistence(); }

  // Registro de usuarios
  async register(email: string, password: string, additionalData?: any) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user?.uid;
  
      if (!uid) {
        throw new Error('UID not returned during registration');
      }
  
      await this.firestore.collection('users').doc(uid).set({
        uid,
        email,
        name: additionalData?.name || '',
        role: additionalData?.role || 'cliente',
        createdAt: new Date(),
      });
      console.log('Usuario registrado y guardado en Firestore');
  
      return userCredential;
    } catch (error) {
      this.handleFirebaseError(error, 'Error al registrar usuario');
      throw error;
    }
  }
  

  getAuthState(): Observable<any> {
    return this.afAuth.authState;
  }

  sendPasswordResetEmail(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Inicio de sesión exitoso:', userCredential.user);
      return userCredential;
    } catch (error) {
      this.handleFirebaseError(error, 'Error al iniciar sesión');
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log('Sesión cerrada exitosamente.');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
  

  async setAuthPersistence() {
    try {
      await this.afAuth.setPersistence('local');
      console.log('Persistencia de sesión configurada.');
    } catch (error) {
      console.error('Error configurando la persistencia:', error);
    }
  }

  getCurrentUser() {
    return this.afAuth.authState; 
  }

  getUserData(uid: string) {
    console.log('Obteniendo datos del usuario con UID:', uid);
    return this.firestore.collection('users').doc(uid).valueChanges();
  }

  async getCurrentUserUID(): Promise<string | null> {
    const user = await this.afAuth.authState.toPromise();
    return user?.uid || null;
  }

  private handleFirebaseError(error: any, message: string) {
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          console.error(`${message}: El correo ya está en uso.`);
          break;
        case 'auth/invalid-email':
          console.error(`${message}: El correo no es válido.`);
          break;
        case 'auth/user-not-found':
          console.error(`${message}: Usuario no encontrado.`);
          break;
        case 'auth/wrong-password':
          console.error(`${message}: Contraseña incorrecta.`);
          break;
        default:
          console.error(`${message}: ${error.message}`);
          break;
      }
    } else {
      console.error(`${message}: ${error}`);
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user) 
    );
  }
}
