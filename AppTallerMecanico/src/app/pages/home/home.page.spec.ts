import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomePage } from './home.page';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ReviewsService } from '../../services/reviews.service';
import { of } from 'rxjs';

// Mock para las dependencias
const mockAuthService = {
  getAuthState: jasmine.createSpy('getAuthState').and.returnValue(of({ uid: '12345' })),
  getUserData: jasmine.createSpy('getUserData').and.returnValue(of({ name: 'Test User', role: 'cliente' })),
  logout: jasmine.createSpy('logout').and.returnValue(Promise.resolve())
};

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

const mockDialog = {
  open: jasmine.createSpy('open').and.returnValue({
    afterClosed: () => of(true) // Simula confirmación de cierre de sesión
  })
};

const mockSnackBar = {
  open: jasmine.createSpy('open')
};

const mockFirestore = {
  collection: jasmine.createSpy('collection').and.returnValue({
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of([
      { serviceName: 'Reparación', createdAt: { toDate: () => new Date() } }
    ]))
  })
};

const mockReviewsService = {
  getReviews: jasmine.createSpy('getReviews').and.returnValue(of([
    { userName: 'John Doe', rating: 5 }
  ]))
};

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: AngularFirestore, useValue: mockFirestore },
        { provide: ReviewsService, useValue: mockReviewsService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data on init', () => {
    expect(mockAuthService.getAuthState).toHaveBeenCalled();
    expect(mockAuthService.getUserData).toHaveBeenCalledWith('12345');
    expect(component.userName).toBe('Test User');
    expect(component.userRole).toBe('cliente');
  });

  it('should load recent activities', () => {
    component.loadRecentActivities();
    expect(mockFirestore.collection).toHaveBeenCalledWith('requests', jasmine.any(Function));
    expect(mockReviewsService.getReviews).toHaveBeenCalled();
    expect(component.recentActivities.length).toBeGreaterThan(0);
  });

  it('should navigate to solicitar-servicio', () => {
    component.goToSolicitarServicio();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/solicitar-servicio']);
  });

  it('should open logout dialog and logout', async () => {
    await component.logout();
    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(component.userName).toBe('');
    expect(component.userRole).toBe('');
  });

  it('should change the current view', () => {
    component.changeView('new-view');
    expect(component.currentView).toBe('new-view');
  });

  it('should handle vibration call', async () => {
    const hapticsSpy = spyOn<any>(navigator, 'vibrate').and.returnValue(true);
    await component.vibrate();
    expect(hapticsSpy).toHaveBeenCalled();
  });
});
