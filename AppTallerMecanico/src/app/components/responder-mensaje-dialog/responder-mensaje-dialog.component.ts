import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/auth.service';
import { updateDoc, arrayUnion, doc } from 'firebase/firestore';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-responder-mensaje-dialog',
  templateUrl: './responder-mensaje-dialog.component.html',
  styleUrls: ['./responder-mensaje-dialog.component.scss']
})
export class ResponderMensajeDialogComponent {
  responseForm: FormGroup;
  currentUserEmail: string = ''; 

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ResponderMensajeDialogComponent>,
    private firestore: AngularFirestore,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.responseForm = this.fb.group({
      responseText: ['', Validators.required],
    });

    
    this.authService.getCurrentUser().subscribe((user) => {
      if (user?.email) {
        this.currentUserEmail = user.email;
      }
    });
  }

  async onSave() {
    if (this.responseForm.invalid) {
      console.warn('El formulario no es válido');
      return;
    }

    const responseData = {
      responseText: this.responseForm.value.responseText,
      respondedBy: this.currentUserEmail, 
      createdAt: new Date()
    };

    try {
      const messageRef = this.firestore.collection('messages').doc(this.data.messageId).ref;

      await updateDoc(messageRef, {
        responses: arrayUnion(responseData)
      });

      console.log('Respuesta guardada correctamente.');
      this.dialogRef.close();
    } catch (error) {
      console.error('Error al guardar la respuesta:', error);
    }
  }

  async vibrate() {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  }
  

  onCancel() {
    this.dialogRef.close();
  }
}
