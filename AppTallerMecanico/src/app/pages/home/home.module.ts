import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

// Importar Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { LogoutConfirmDialogComponent } from '../log-out-confirm-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GestionCatalogoComponent } from 'src/app/components/gestion-catalogo/gestion-catalogo.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AgregarProductoDialogComponent } from 'src/app/components/agregar-producto-dialog/agregar-producto-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; // Importa MatSelectModule
import { MatOptionModule } from '@angular/material/core';
import { ComunicacionesComponent } from 'src/app/components/comunicaciones/comunicaciones.component';
import { ResponderMensajeDialogComponent } from 'src/app/components/responder-mensaje-dialog/responder-mensaje-dialog.component';
import { EnviarMensajeDialogComponent } from 'src/app/components/enviar-mensaje-dialog/enviar-mensaje-dialog.component';
import { SolicitarServicioComponent } from 'src/app/components/solicitar-servicio/solicitar-servicio.component'
import { ReviewsComponent } from 'src/app/components/reviews/reviews.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatToolbarModule, 
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatOptionModule,
    HttpClientModule
  ],
  declarations: [
    HomePage, 
    LogoutConfirmDialogComponent, 
    AgregarProductoDialogComponent, 
    GestionCatalogoComponent,
    ComunicacionesComponent,
    ResponderMensajeDialogComponent,
    EnviarMensajeDialogComponent,
    SolicitarServicioComponent,
    ReviewsComponent
  ],
  exports: [ReviewsComponent]
})
export class HomePageModule {}
