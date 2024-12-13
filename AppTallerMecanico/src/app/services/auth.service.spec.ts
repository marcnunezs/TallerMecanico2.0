import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  // Mock de AngularFireAuth
  const mockAngularFireAuth: any = {
    createUserWithEmailAndPassword: jasmine.createSpy('createUserWithEmailAndPassword')
      .and.returnValue(Promise.resolve({ user: { uid: '12345' } })),
    signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword')
      .and.returnValue(Promise.resolve({ user: { uid: '12345' } })),
    signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve()),
    authState: of({ uid: '12345' }),
    setPersistence: jasmine.createSpy('setPersistence').and.returnValue(Promise.resolve())
  };

  // Mock de AngularFirestore
  const mockAngularFirestore: any = {
    collection: jasmine.createSpy('collection').and.returnValue({
      doc: jasmine.createSpy('doc').and.returnValue({
        set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
        valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of({ name: 'Test User', role: 'cliente' }))
      })
    })
  };

  // Mock de Router
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: AngularFirestore, useValue: mockAngularFirestore },
        { provide: Router, useValue: mockRouter }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login a user successfully', async () => {
    const email = 'test@test.com';
    const password = 'password123';
  
    // Configura el mock para devolver una promesa resuelta
    mockAngularFireAuth.signInWithEmailAndPassword.and.returnValue(
      Promise.resolve({ user: { uid: '12345' } })
    );
  
    const result = await service.login(email, password);
  
    // Verificaciones
    expect(mockAngularFireAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(email, password);
    expect(result.user?.uid).toBe('12345');
  });
  
  
  

  it('should return auth state', (done) => {
    service.getAuthState().subscribe((state) => {
      expect(state).toEqual({ uid: '12345' });
      done();
    });
  });

  it('should get user data successfully', (done) => {
    service.getUserData('12345').subscribe((userData) => {
      expect(userData).toEqual({ name: 'Test User', role: 'cliente' });
      expect(mockAngularFirestore.collection).toHaveBeenCalledWith('users');
      done();
    });
  });

  it('should throw an error if login fails', async () => {
    mockAngularFireAuth.signInWithEmailAndPassword.and.returnValue(
      Promise.reject(new Error('Invalid credentials'))
    );

    try {
      await service.login('test@test.com', 'wrongpassword');
      fail('Should have thrown an error');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Invalid credentials');
      } else {
        fail('Error is not an instance of Error');
      }
    }
  });
});
