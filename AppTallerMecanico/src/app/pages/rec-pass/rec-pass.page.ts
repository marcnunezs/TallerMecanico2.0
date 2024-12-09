import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-rec-pass',
  templateUrl: './rec-pass.page.html',
  styleUrls: ['./rec-pass.page.scss']
})
export class RecPassPage {
  recPassForm: FormGroup;
  loading = false;
  successMessage: string = ''; 
  errorMessage: string = '';   

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.recPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.recPassForm.controls;
  }

  sendPasswordReset() {
    if (this.recPassForm.invalid) return;
  
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';
  
    const email = this.recPassForm.value.email;
  
    this.authService
      .sendPasswordResetEmail(email)
      .then(() => {
        this.successMessage = 'Se ha enviado un enlace de restablecimiento a tu correo.';
        this.loading = false;
      })
      .catch((error: any) => {
        this.errorMessage = 'Error al enviar el enlace. Verifica el correo e intenta de nuevo.';
        console.error('Error:', error);
        this.loading = false;
      });
  }

  goBack() {
    this.router.navigate(['/login']);
  }
  
}
