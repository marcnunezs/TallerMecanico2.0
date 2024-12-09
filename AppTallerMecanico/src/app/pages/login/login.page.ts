import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

 
  async login() {
    if (this.loginForm.invalid) {
      console.error('El formulario no es válido');
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;

    try {
      await this.authService.login(email, password);
      console.log('Inicio de sesión exitoso');
      this.router.navigate(['/home']); 
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error al iniciar sesión:', error.message);
      } else {
        console.error('Error desconocido:', error);
      }
    } finally {
      this.loading = false;
    }
  }


  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToRecoverPassword() {
    this.router.navigate(['/rec-pass']); 
  }
}
