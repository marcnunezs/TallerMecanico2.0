import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnviarMensajeDialogComponent } from './enviar-mensaje-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Importa MatInputModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('EnviarMensajeDialogComponent', () => {
  let component: EnviarMensajeDialogComponent;
  let fixture: ComponentFixture<EnviarMensajeDialogComponent>;
  let mockFirestore: any;
  let mockAuthService: any;
  let mockDialogRef: any;

  beforeEach(async () => {
    // Mock Firestore
    mockFirestore = {
      collection: jasmine.createSpy('collection').and.returnValue({
        get: jasmine.createSpy('get').and.returnValue(of({
          docs: [
            { data: () => ({ email: 'user1@test.com', name: 'User One' }) },
            { data: () => ({ email: 'user2@test.com', name: 'User Two' }) }
          ]
        }))
      })
    };

    // Mock AuthService
    mockAuthService = {
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(of({ email: 'current@test.com' }))
    };

    // Mock MatDialogRef
    mockDialogRef = {
      close: jasmine.createSpy('close')
    };

    await TestBed.configureTestingModule({
      declarations: [EnviarMensajeDialogComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,        // Importa MatSelectModule
        MatFormFieldModule,     // Importa MatFormFieldModule
        MatInputModule,         // Importa MatInputModule
        BrowserAnimationsModule // Necesario para Material
      ],
      providers: [
        { provide: AngularFirestore, useValue: mockFirestore },
        { provide: AuthService, useValue: mockAuthService },
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarMensajeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
