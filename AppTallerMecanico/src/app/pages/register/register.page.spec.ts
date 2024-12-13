import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let mockAuthService: any;
  let mockRouter: any;
  let mockSnackBar: any;

  beforeEach(async () => {
    // Mock de AuthService
    mockAuthService = {
      register: jasmine.createSpy('register').and.returnValue(Promise.resolve())
    };

    // Mock de Router
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    // Mock de MatSnackBar
    mockSnackBar = {
      open: jasmine.createSpy('open')
    };

    await TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,   // Importa MatFormFieldModule
        MatInputModule,       // Importa MatInputModule
        MatSelectModule,      // Importa MatSelectModule
        BrowserAnimationsModule // Necesario para Angular Material
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
