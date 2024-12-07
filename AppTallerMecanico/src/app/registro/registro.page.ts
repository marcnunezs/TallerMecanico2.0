import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registroForm!: FormGroup;

  
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.registroForm.valid) {
      const { nombre, correo, password, rol } = this.registroForm.value;

      try {
        
        const userCredential = await createUserWithEmailAndPassword(this.auth, correo, password);
        const uid = userCredential.user.uid;

        
        const userDocRef = doc(this.firestore, `usuarios/${uid}`);
        await setDoc(userDocRef, {
          nombre,
          correo,
          rol,
        });

        console.log('Usuario registrado exitosamente');
        this.router.navigate(['/login']); 
      } catch (error) {
        console.error('Error en el registro:', error);
      }
    }
  }
}
