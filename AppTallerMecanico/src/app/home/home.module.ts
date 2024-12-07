import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomePageRoutingModule } from './home-routing.module';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { ContactoComponent } from '../componentes/contacto/contacto.component';
import { RegUsuariosComponent } from '../componentes/reg-usuarios/reg-usuarios.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiRestComponent } from '../componentes/api-rest/api-rest.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { QrScannerComponent } from '../componentes/qr-scanner/qr-scanner.component';
import { ListaServiciosPageModule } from '../lista-servicios/lista-servicios.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    ListaServiciosPageModule
  ],
  declarations: [
    HomePage,
    ContactoComponent,
    RegUsuariosComponent,
    ApiRestComponent,
    QrScannerComponent
  ]
})
export class HomePageModule {}
