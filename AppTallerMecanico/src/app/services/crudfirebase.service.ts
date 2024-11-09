import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CrudfirebaseService {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  async addUser(email: string, password: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log('Usuario agregado: ', userCredential.user);
    } catch (error: any) {
      console.error('Error al agregar usuario: ', error);
      alert('No se pudo agregar el usuario: ' + error.message);
    }
  }

  async deleteUser(): Promise<void> {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        await user.delete();
        console.log('Usuario eliminado');
        alert('Usuario eliminado exitosamente');
        this.router.navigate(['/']);
      }
    } catch (error: any) {
      console.error('Error al eliminar usuario; ', error);
      alert('No se pudo eliminar el usuario: ' + error.message);
    }
  }

  async getUser(): Promise<any> {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (error: any) {
      console.error('Error al obtener usuario: ', error);
      return null;
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log('Sesión cerrada');
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('Error al cerrar sesión: ', error);
    }
  }
}
