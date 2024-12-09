import { Component } from '@angular/core';

@Component({
  selector: 'app-logout-confirm-dialog',
  template: `
    <h1 mat-dialog-title>¿Cerrar Sesión?</h1>
    <div mat-dialog-content>
      <p>¿Estás seguro de que quieres cerrar la sesión?</p>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>No</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Sí</button>
    </div>
  `,
    standalone: false
})
export class LogoutConfirmDialogComponent {}
