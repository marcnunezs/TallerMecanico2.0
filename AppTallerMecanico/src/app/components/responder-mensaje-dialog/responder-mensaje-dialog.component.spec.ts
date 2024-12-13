import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponderMensajeDialogComponent } from './responder-mensaje-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('ResponderMensajeDialogComponent', () => {
  let component: ResponderMensajeDialogComponent;
  let fixture: ComponentFixture<ResponderMensajeDialogComponent>;
  let firestoreMock: any;
  let authServiceMock: any;
  let dialogRefMock: any;

  const fixedDate = new Date('2023-12-30T21:00:00.000Z');

  beforeEach(async () => {
    const updateSpy = jasmine.createSpy('updateSpy').and.returnValue(Promise.resolve());

    firestoreMock = {
      collection: jasmine.createSpy('collectionSpy').and.returnValue({
        doc: jasmine.createSpy('docSpy').and.returnValue({
          update: updateSpy,
        }),
      }),
    };

    authServiceMock = {
      getCurrentUser: jasmine.createSpy('getCurrentUserSpy').and.returnValue(of({ email: 'test@test.com' })),
    };

    dialogRefMock = {
      close: jasmine.createSpy('closeSpy'),
    };

    await TestBed.configureTestingModule({
      declarations: [ResponderMensajeDialogComponent],
      providers: [
        { provide: AngularFirestore, useValue: firestoreMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { messageId: '12345' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResponderMensajeDialogComponent);
    component = fixture.componentInstance;

    spyOn(Date, 'now').and.returnValue(fixedDate.getTime());

    fixture.detectChanges();
  });

  it('should save the response and close the dialog', async () => {
    component.responseForm.setValue({ responseText: 'This is a test response' });

    await component.onSave();

    const expectedResponse = {
      responses: jasmine.arrayContaining([
        jasmine.objectContaining({
          responseText: 'This is a test response',
          respondedBy: 'test@test.com',
          createdAt: new Date(Date.now()),
        }),
      ]),
    };

    const updateSpy = firestoreMock.collection().doc().update;
    expect(updateSpy).toHaveBeenCalledWith(expectedResponse);
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should not save if the form is invalid', async () => {
    component.responseForm.setValue({ responseText: '' });
    await component.onSave();

    const updateSpy = firestoreMock.collection().doc().update;
    expect(updateSpy).not.toHaveBeenCalled();
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should close the dialog on cancel', () => {
    component.onCancel();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
