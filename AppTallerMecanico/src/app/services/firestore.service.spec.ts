import { TestBed } from '@angular/core/testing';
import { FirestoreService } from './firestore.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

describe('FirestoreService', () => {
  let service: FirestoreService;
  let mockAngularFirestore: any;

  // Mock completo para DocumentReference
  const mockDocumentReference = {
    id: '12345',
    set: jasmine.createSpy('set'),
    update: jasmine.createSpy('update'),
    delete: jasmine.createSpy('delete'),
    get: jasmine.createSpy('get'),
    onSnapshot: jasmine.createSpy('onSnapshot'),
    path: 'test-collection/12345',
    firestore: {},
    parent: {},
    collection: jasmine.createSpy('collection'),
    isEqual: jasmine.createSpy('isEqual'),
    withConverter: jasmine.createSpy('withConverter')
  };

  const mockCollection = {
    add: jasmine.createSpy('add').and.returnValue(Promise.resolve(mockDocumentReference)),
    snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(of([
      { 
        payload: { 
          doc: { 
            id: '12345', 
            data: () => ({ name: 'Test Document' }) 
          } 
        }
      }
    ])),
    doc: jasmine.createSpy('doc').and.returnValue(mockDocumentReference),
  };

  beforeEach(() => {
    mockAngularFirestore = {
      collection: jasmine.createSpy('collection').and.returnValue(mockCollection),
    };

    TestBed.configureTestingModule({
      providers: [
        FirestoreService,
        { provide: AngularFirestore, useValue: mockAngularFirestore },
      ],
    });

    service = TestBed.inject(FirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a document to the collection', async () => {
    const testData = { name: 'New Document' };

    const result = await service.addDocument('test-collection', testData);

    expect(mockAngularFirestore.collection).toHaveBeenCalledWith('test-collection');
    expect(mockCollection.add).toHaveBeenCalledWith(testData);
    expect(result.id).toBe('12345'); // Verificamos la propiedad 'id'
  });

  it('should get documents from the collection', (done) => {
    service.getDocuments('test-collection').subscribe((docs) => {
      expect(mockAngularFirestore.collection).toHaveBeenCalledWith('test-collection');
      expect(mockCollection.snapshotChanges).toHaveBeenCalled();
      expect(docs.length).toBe(1);
      expect(docs[0].payload.doc.id).toBe('12345');
      done();
    });
  });

  it('should update a document in the collection', async () => {
    const testData = { name: 'Updated Document' };

    await service.updateDocument('test-collection', '12345', testData);

    expect(mockAngularFirestore.collection).toHaveBeenCalledWith('test-collection');
    expect(mockCollection.doc).toHaveBeenCalledWith('12345');
    expect(mockDocumentReference.update).toHaveBeenCalledWith(testData);
  });

  it('should delete a document from the collection', async () => {
    await service.deleteDocument('test-collection', '12345');

    expect(mockAngularFirestore.collection).toHaveBeenCalledWith('test-collection');
    expect(mockCollection.doc).toHaveBeenCalledWith('12345');
    expect(mockDocumentReference.delete).toHaveBeenCalled();
  });
});
