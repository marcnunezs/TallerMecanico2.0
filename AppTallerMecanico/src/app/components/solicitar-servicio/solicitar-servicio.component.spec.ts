import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitarServicioComponent } from './solicitar-servicio.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of, throwError } from 'rxjs';

describe('SolicitarServicioComponent', () => {
  let component: SolicitarServicioComponent;
  let fixture: ComponentFixture<SolicitarServicioComponent>;
  let mockFirestore: any;

  beforeEach(async () => {
    // Firestore Mock
    mockFirestore = {
      collection: jasmine.createSpy('collection').and.returnValue({
        snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(throwError(() => new Error('Firestore error')))
      })
    };

    await TestBed.configureTestingModule({
      declarations: [SolicitarServicioComponent],
      providers: [
        { provide: AngularFirestore, useValue: mockFirestore }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should handle Firestore errors during loadServices', () => {
    spyOn(console, 'error'); // Espía el console.error

    component.loadServices(); // Llama al método

    expect(mockFirestore.collection).toHaveBeenCalledWith('products');
    expect(console.error).toHaveBeenCalledWith('Error al cargar los productos:', jasmine.any(Error));
  });
});
