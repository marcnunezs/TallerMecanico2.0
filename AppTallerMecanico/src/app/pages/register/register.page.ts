import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage {
  registerForm: FormGroup;
  loading: boolean = false; 

  constructor(

    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar

  ){
      
    // Crear el formulario con validaciones
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['', Validators.required] // Campo de rol obligatorio
    }, { validators: this.passwordMatchValidator });
  }

  // Validación personalizada: confirmar contraseña
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Acceder a los controles del formulario
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  
  goToLogin() {
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }

  // Método para registrar al usuario
  async register() {
    if (this.registerForm.invalid) {
      console.error('El formulario no es válido.');
      return;
    }
  
    this.loading = true;
    const { name, email, password, role } = this.registerForm.value;
  
    try {
      // Llamar al servicio de registro
      await this.authService.register(email, password, { name, role });
      console.log(`Usuario registrado exitosamente como ${role}.`);
  
      // Notificación de éxito
      this.snackBar.open(`¡Bienvenido, ${name}! Registro exitoso.`, 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
  
      // Redirigir al login
      this.router.navigate(['/login']);
    } catch (error: any) {
      // Manejo de errores con detalle
      const errorMessage = error?.message || 'Error desconocido. Inténtalo de nuevo.';
      console.error('Error al registrar usuario:', errorMessage);
  
      // Mostrar notificación de error
      this.snackBar.open(`Error: ${errorMessage}`, 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    } finally {
      // Asegurar que el spinner de carga se desactive
      this.loading = false;
    }
  }
  
}
