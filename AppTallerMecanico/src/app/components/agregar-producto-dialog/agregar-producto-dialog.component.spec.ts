import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarProductoDialogComponent } from './agregar-producto-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('AgregarProductoDialogComponent', () => {
  let component: AgregarProductoDialogComponent;
  let fixture: ComponentFixture<AgregarProductoDialogComponent>;

  // Mock para MatDialogRef
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  // Mock para MAT_DIALOG_DATA
  const mockDialogData = {
    someData: 'Test Data'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarProductoDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProductoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog', () => {
    component.closeDialog();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
