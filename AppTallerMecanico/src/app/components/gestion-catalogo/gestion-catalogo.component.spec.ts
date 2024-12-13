import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionCatalogoComponent } from './gestion-catalogo.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';

describe('GestionCatalogoComponent', () => {
  let component: GestionCatalogoComponent;
  let fixture: ComponentFixture<GestionCatalogoComponent>;
  let mockFirestore: any;
  let mockDialog: any;

  beforeEach(async () => {
    // Mock Firestore
    mockFirestore = {
      collection: jasmine.createSpy('collection').and.returnValue({
        add: jasmine.createSpy('add').and.returnValue(Promise.resolve()),
        snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(of([])),
      }),
    };

    // Mock MatDialog
    mockDialog = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of({ name: 'Nuevo Producto', description: 'Nuevo Desc', price: 150 }),
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [GestionCatalogoComponent],
      imports: [MatTableModule],
      providers: [
        { provide: AngularFirestore, useValue: mockFirestore },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open the add product dialog and add a product', async () => {
    component.openAddDialog();

    // Verifica que el diálogo se haya abierto
    expect(mockDialog.open).toHaveBeenCalled();

    // Verifica que el método `add` de Firestore fue llamado con los datos correctos
    expect(mockFirestore.collection).toHaveBeenCalledWith('products');
    expect(mockFirestore.collection().add).toHaveBeenCalledWith({
      name: 'Nuevo Producto',
      description: 'Nuevo Desc',
      price: 150,
    });
  });
});
