import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/auth.service';
import { EnviarMensajeDialogComponent } from '../enviar-mensaje-dialog/enviar-mensaje-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ResponderMensajeDialogComponent } from '../responder-mensaje-dialog/responder-mensaje-dialog.component';


interface Message {
  id?: string;              
  sender: string;           
  recipient: string;      
  subject: string;          
  content: string;          
  createdAt: any;           
  responses?: any[];         
}

@Component({
  selector: 'app-comunicaciones',
  templateUrl: './comunicaciones.component.html',
  styleUrls: ['./comunicaciones.component.scss'],
})
export class ComunicacionesComponent implements OnInit {
  messages: any[] = [];
  currentUser: any;
  userRole: string = '';

  constructor(
    private firestore: AngularFirestore, 
    private authService: AuthService,
    private dialog: MatDialog
    
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user && user.email) {
        this.currentUser = user.email;
        console.log('Usuario actual (email):', this.currentUser);
        this.loadUserRole();
      } else {
        console.error('No se pudo obtener el usuario autenticado.');
      }
    });
  }
  
  loadUserRole() {
    console.log('Cargando rol para usuario actual (email):', this.currentUser);
  
    this.firestore
      .collection('users', ref => ref.where('email', '==', this.currentUser)) 
      .get()
      .subscribe((snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0]; 
          const userData = doc.data() as { role?: string };
          this.userRole = userData?.role || 'cliente';
          console.log('Rol del usuario:', this.userRole);
          this.loadMessages();
        } else {
          console.error(`El documento del usuario (${this.currentUser}) no existe en Firestore.`);
        }
      }, (error) => {
        console.error('Error al cargar el rol del usuario:', error);
      });
  }

  loadMessages() {
    let query;
  
    if (this.userRole === 'proveedor') {
      query = this.firestore.collection('messages', ref => ref.where('recipient', '==', this.currentUser));
    } else {
      query = this.firestore.collection('messages', ref => ref.where('sender', '==', this.currentUser));
    }
  
    query.snapshotChanges().subscribe((data) => {
      this.messages = data.map((e) => {
        const docData = e.payload.doc.data() as Message;
        return {
          id: e.payload.doc.id,
          ...docData,
          createdAt: docData.createdAt?.toDate ? docData.createdAt.toDate() : new Date(docData.createdAt), 
          responses: docData.responses || []
        };
      });
  
      console.log('Mensajes cargados:', this.messages);
    });
  }

  openSendMessageDialog() {
    this.dialog.open(EnviarMensajeDialogComponent);
  }

  openReplyDialog(messageId: string) {
   
    this.dialog.open(ResponderMensajeDialogComponent, {
      data: { messageId }
    });
  }
  
}
