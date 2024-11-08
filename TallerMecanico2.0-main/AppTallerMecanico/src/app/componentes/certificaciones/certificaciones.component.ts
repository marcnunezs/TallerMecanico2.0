import { Component } from '@angular/core';

// Interfaz para definir la estructura de un certificado
interface Certificacion {
  nombre: string;
  vencimiento: boolean;
  // Puedes agregar más propiedades: fechaObtencion: Date, entidadEmisora: string, etc.
}

@Component({
  selector: 'app-certificaciones', // Selector para usar en el template
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.css']
})
export class CertificacionesComponent {
  certificaciones: Certificacion[] = [];
  nombreCertificado = '';
  vencimientoChecked = false;

  agregarCertificacion() {
    if (!this.nombreCertificado) {
      console.error('El nombre del certificado es requerido');
      return;
    }

    const nuevaCertificacion: Certificacion = {
      nombre: this.nombreCertificado,
      vencimiento: this.vencimientoChecked
    };

    this.certificaciones.push(nuevaCertificacion);
    this.nombreCertificado = '';
    this.vencimientoChecked = false;
  }
}
