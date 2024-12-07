import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaServiciosPageRoutingModule } from './lista-servicios-routing.module';

import { ListaServiciosPage } from './lista-servicios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaServiciosPageRoutingModule
  ],
  declarations: [ListaServiciosPage],
  exports: [
    ListaServiciosPage
  ]
})
export class ListaServiciosPageModule {}
