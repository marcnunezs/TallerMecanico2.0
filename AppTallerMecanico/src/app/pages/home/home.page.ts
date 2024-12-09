import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LogoutConfirmDialogComponent } from '../log-out-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  userName: string = '';
  userRole: string = '';
  loading: boolean = true;
  currentView: string = 'home'; 
  recentActivities: any[] = [];

  constructor(
    private authService: AuthService, 
    private router: Router,
    private dialog: MatDialog, 
    private snackBar: MatSnackBar,
    private firestore: AngularFirestore,
    private reviewsService: ReviewsService
  ) {}

  async ngOnInit() {
    this.loading = true;
  
    this.authService.getAuthState().subscribe({
      next: (user) => {
        if (user) {
          this.authService.getUserData(user.uid).subscribe({
            next: (userData: any) => { 
              console.log('Datos del usuario obtenidos:', userData);
  
              this.userName = userData['name'] || 'Usuario';
              this.userRole = userData['role'] || 'cliente';
  
              this.loading = false; 
            },
            error: (error) => {
              console.error('Error al obtener datos del usuario:', error);
              this.loading = false;
            }
          });
        } else {
          console.log('No hay usuario autenticado.');
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error de autenticación:', error);
        this.loading = false;
      }
    });

    this.loadRecentActivities();
  }

  private handleError() {
    this.userName = 'Usuario';
    this.userRole = '';
    this.loading = false;
    this.router.navigate(['/login']);
  }

  async vibrate() {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  }

  changeView(view: string) {
    this.currentView = view;
  }

  goToSolicitarServicio() {
    this.router.navigate(['/solicitar-servicio']);
  }

  async logout() {
    const dialogRef = this.dialog.open(LogoutConfirmDialogComponent);
  
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          await this.authService.logout(); 
          this.userRole = ''; 
          this.userName = ''; 
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      } else {
        console.log('Cierre de sesión cancelado.');
      }
    });
  }

  loadRecentActivities() {
    this.recentActivities = []; // Limpia las actividades previas

    // 1. Obtener solicitudes de Firebase
    this.firestore.collection('requests', ref => ref.limit(5)).valueChanges().subscribe(requests => {
      requests.forEach((req: any) => {
        this.recentActivities.push({
          description: `Cliente solicitó el servicio: ${req.serviceName || 'desconocido'}`,
          timestamp: req.createdAt?.toDate().toLocaleString() || 'Fecha no disponible'
        });
      });
    });

    // 2. Obtener reseñas desde la API Reviews
    this.reviewsService.getReviews().subscribe(reviews => {
      reviews.slice(0, 5).forEach(review => {
        this.recentActivities.push({
          description: `Reseña: ${review.userName} calificó un producto con ${review.rating} ⭐`,
          timestamp: new Date().toLocaleString()
        });
      });
    });

    // Ordenar las actividades por fecha (opcional)
    setTimeout(() => {
      this.recentActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }, 1000);
  }
  
  
  
}
