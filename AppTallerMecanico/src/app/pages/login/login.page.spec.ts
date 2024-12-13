import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(() => {
    // Mock del AuthService
    mockAuthService = {
      login: jasmine.createSpy('login').and.returnValue(Promise.resolve())
    };

    // Mock del Router
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [ReactiveFormsModule], // Necesario para formularios reactivos
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when fields are empty', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should have valid form when fields are correctly filled', () => {
    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('password123');

    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call AuthService login and navigate to home on successful login', async () => {
    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('password123');

    await component.login();

    expect(mockAuthService.login).toHaveBeenCalledWith('test@test.com', 'password123');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should not call AuthService login if form is invalid', async () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');

    await component.login();

    expect(mockAuthService.login).not.toHaveBeenCalled();
  });

  it('should navigate to register page when goToRegister is called', () => {
    component.goToRegister();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/register']);
  });

  it('should navigate to recover password page when goToRecoverPassword is called', () => {
    component.goToRecoverPassword();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/rec-pass']);
  });
});
