import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RecPassPage } from './rec-pass.page';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('RecPassPage', () => {
  let component: RecPassPage;
  let fixture: ComponentFixture<RecPassPage>;
  let mockAuthService: any;

  beforeEach(async () => {
    // Mock del AuthService
    mockAuthService = {
      sendPasswordResetEmail: jasmine.createSpy('sendPasswordResetEmail'),
    };

    await TestBed.configureTestingModule({
      declarations: [RecPassPage],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set errorMessage if sendPasswordResetEmail fails', fakeAsync(() => {
    // Configura el mock para que devuelva un error
    mockAuthService.sendPasswordResetEmail.and.returnValue(
      Promise.reject(new Error('Simulated error'))
    );

    // Configura un email válido
    component.recPassForm.controls['email'].setValue('test@test.com');

    // Llama al método
    component.sendPasswordReset();
    tick(); // Simula el tiempo necesario para que se resuelva la promesa

    // Actualiza la vista del componente
    fixture.detectChanges();

    // Verifica las expectativas
    expect(component.errorMessage).toBe('Error al enviar el enlace. Verifica el correo e intenta de nuevo.');
    expect(component.loading).toBeFalse();
  }));
});
