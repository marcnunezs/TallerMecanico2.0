import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
10 import { CertificacionesComponent } from './componentes/certificaciones/certificaciones.component';
11 import { ExperienciaLaboralComponent } from './componentes/experiencia-laboral/experiencia-laboral.component';
12 import { MisDatosComponent } from './componentes/mis-datos/mis-datos.component';

// 13 //Importar los módulos de Angular Material
14 import { MatInputModule } from '@angular/material/input';
15 import { MatFormFieldModule } from '@angular/material/form-field';
16 import { MatCheckboxModule } from '@angular/material/checkbox';
17 import { MatToolbarModule } from '@angular/material/toolbar';
18 import { MatButtonModule } from '@angular/material/button';
19 import { MatButtonToggleModule } from '@angular/material/button-toggle';
20
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HomePageRoutingModule,

    // Agregar los módulos importados de Angular Material
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomePage,

    // Agregar los componentes hijos importados
    CertificacionesComponent,
    ExperienciaLaboralComponent,
    MisDatosComponent
  ]
})
export class HomePageModule {}

export class HomePage {
  receivedUsername!: string; // Variable que almacena localmente el dato enviado desde Login
  selectedSegment: string = 'mis-datos'; // Valor inicial para el segmento seleccionado
}
