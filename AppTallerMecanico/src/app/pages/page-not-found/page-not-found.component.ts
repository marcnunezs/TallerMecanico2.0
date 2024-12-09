import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div style="text-align: center; margin-top: 50px;">
      <h1>Error 404</h1>
      <p>Página no encontrada</p>
      <a routerLink="/">Volver al inicio</a>
    </div>
  `
})
export class PageNotFoundComponent {}
