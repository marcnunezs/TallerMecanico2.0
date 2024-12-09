import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-enviar-mensaje-dialog',
  templateUrl: './enviar-mensaje-dialog.component.html',
  styleUrls: ['./enviar-mensaje-dialog.component.scss'],
})
export class EnviarMensajeDialogComponent implements OnInit {
  messageForm: FormGroup;
  currentUserEmail: string = '';
  usersList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private dialogRef: MatDialogRef<EnviarMensajeDialogComponent>
  ) {
    
    this.messageForm = this.fb.group({
      subject: ['', Validators.required],
      content: ['', Validators.required],
      recipient: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadCurrentUser();
    this.loadUsersList();
  }

  async vibrate() {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  }
  

  
  loadCurrentUser() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user?.email) {
        this.currentUserEmail = user.email;
        console.log('Email del usuario autenticado:', this.currentUserEmail);
      } else {
        console.error('No se pudo obtener el email del usuario.');
      }
    });
  }

  
  loadUsersList() {
    this.firestore
      .collection('users')
      .get()
      .subscribe((snapshot) => {
        this.usersList = snapshot.docs
          .map((doc) => doc.data() as { email: string; name?: string }) 
          .filter((user) => user.email !== this.currentUserEmail); 
  
        console.log('Usuarios disponibles:', this.usersList);
      });
  }

  
  async onSend() {
    console.log('Método onSend() llamado');
    console.log('Valores del formulario:', this.messageForm.value);

    if (this.messageForm.invalid) {
      console.error('El formulario no es válido.');
      return;
    }

    try {
      const messageData = {
        ...this.messageForm.value,
        sender: this.currentUserEmail, 
        createdAt: new Date(),
      };

      console.log('Datos a enviar a Firestore:', messageData);

      await this.firestore.collection('messages').add(messageData);
      console.log('Mensaje guardado correctamente en Firestore.');

      this.dialogRef.close(true); 
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  }

  
  onCancel() {
    this.dialogRef.close(false);
  }
}
