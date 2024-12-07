import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.page.html',
  styleUrls: ['./lista-servicios.page.scss'],
})
export class ListaServiciosPage implements OnInit {

  servicios = [
    { titulo: 'Cambio de Aceite', descripcion: 'Servicio rápido y eficiente para garantizar el buen funcionamiento del motor.' },
    { titulo: 'Alineación y Balanceo', descripcion: 'Mejora el desempeño y la seguridad de tu vehículo.' },
    { titulo: 'Revisión de Frenos', descripcion: 'Verificación completa del sistema de frenos para tu tranquilidad.' },
    { titulo: 'Diagnóstico Computarizado', descripcion: 'Identificación precisa de problemas utilizando tecnología avanzada.' },
    { titulo: 'Mantenimiento Preventivo', descripcion: 'Evita fallas inesperadas con revisiones periódicas y personalizadas.' },
    { titulo: 'Reparación de Motor', descripcion: 'Reparación completa y ajustes para un rendimiento óptimo del motor.' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
