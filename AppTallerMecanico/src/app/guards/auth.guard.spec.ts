import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(() => {
    // Mock del AuthService
    mockAuthService = {
      getAuthState: jasmine.createSpy('getAuthState')
    };

    // Mock del Router
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user is authenticated', (done) => {
    // Simula que el usuario está autenticado
    mockAuthService.getAuthState.and.returnValue(of({ uid: '12345' }));

    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBeTrue();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should deny access and navigate to login when user is not authenticated', (done) => {
    // Simula que el usuario NO está autenticado
    mockAuthService.getAuthState.and.returnValue(of(null));

    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBeFalse();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });
});
