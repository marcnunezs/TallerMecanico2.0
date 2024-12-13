import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComunicacionesComponent } from './comunicaciones.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

// Mocks para dependencias externas
const mockAuthService = {
  getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(of({ email: 'test@user.com' }))
};

const mockFirestore = {
  collection: jasmine.createSpy('collection').and.callFake(() => ({
    get: jasmine.createSpy('get').and.returnValue(of({
      empty: false,
      docs: [{ data: () => ({ role: 'cliente' }) }]
    })),
    where: jasmine.createSpy('where').and.returnValue({}),
    snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(of([
      {
        payload: { doc: { id: '1', data: () => ({ sender: 'test@user.com', recipient: 'recipient@user.com', subject: 'Test Subject', content: 'Test Content', createdAt: new Date() }) } }
      }
    ]))
  }))
};

const mockMatDialog = {
  open: jasmine.createSpy('open')
};

describe('ComunicacionesComponent', () => {
  let component: ComunicacionesComponent;
  let fixture: ComponentFixture<ComunicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComunicacionesComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: AngularFirestore, useValue: mockFirestore },
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load current user on init', () => {
    expect(mockAuthService.getCurrentUser).toHaveBeenCalled();
    expect(component.currentUser).toBe('test@user.com');
  });

  it('should load user role', () => {
    component.currentUser = 'test@user.com';
    component.loadUserRole();

    expect(mockFirestore.collection).toHaveBeenCalledWith('users', jasmine.any(Function));
    expect(component.userRole).toBe('cliente');
  });

  it('should load messages', () => {
    component.userRole = 'cliente';
    component.currentUser = 'test@user.com';

    component.loadMessages();

    expect(mockFirestore.collection).toHaveBeenCalledWith('messages', jasmine.any(Function));
    expect(component.messages.length).toBe(1);
    expect(component.messages[0].subject).toBe('Test Subject');
  });

  it('should open the send message dialog', () => {
    component.openSendMessageDialog();

    expect(mockMatDialog.open).toHaveBeenCalledWith(jasmine.any(Function));
  });

  it('should open the reply dialog with messageId', () => {
    const messageId = '1';
    component.openReplyDialog(messageId);

    expect(mockMatDialog.open).toHaveBeenCalledWith(jasmine.any(Function), { data: { messageId } });
  });
});
