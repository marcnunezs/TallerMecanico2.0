import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule

import { RouterModule, Routes } from '@angular/router';
import { RegistroPage } from './registro.page';

const routes: Routes = [
  { path: '', component: RegistroPage } // Ruta principal de este módulo
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Necesario para formularios reactivos
    IonicModule, // Importante para componentes de Ionic
    RouterModule.forChild(routes)
  ],
  declarations: [RegistroPage]
})
export class RegistroPageModule {}
