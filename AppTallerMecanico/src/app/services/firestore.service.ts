import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {}

  addDocument(collection: string, data: any) {
    return this.firestore.collection(collection).add(data);
  }

  getDocuments(collection: string) {
    return this.firestore.collection(collection).snapshotChanges();
  }

  updateDocument(collection: string, id: string, data: any) {
    return this.firestore.collection(collection).doc(id).update(data);
  }

  deleteDocument(collection: string, id: string) {
    return this.firestore.collection(collection).doc(id).delete();
  }
}
