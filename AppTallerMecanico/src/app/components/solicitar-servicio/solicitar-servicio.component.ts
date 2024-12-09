import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Service {
  id: string;          
  name: string;         
  category: string;     
  description: string; 
  price: number;        
}

@Component({
  selector: 'app-solicitar-servicio',
  templateUrl: './solicitar-servicio.component.html',
  styleUrls: ['./solicitar-servicio.component.scss']
})
export class SolicitarServicioComponent implements OnInit {
  items: Service[] = [];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.loadServices();
  }

  
  loadServices() {
    this.firestore.collection('products').snapshotChanges().subscribe((data) => {
      this.items = data.map((e) => {
        const doc = e.payload.doc;
        const { id: _, ...data } = doc.data() as Service; 
      
        return {
          id: doc.id || '',
          ...data
        };
      });
      
    }, error => {
      console.error('Error al cargar los productos:', error);
    });
  }
  
  
  

  
  acquireService(serviceId: string) {
    console.log('Servicio adquirido con ID:', serviceId);
   
  }
}
