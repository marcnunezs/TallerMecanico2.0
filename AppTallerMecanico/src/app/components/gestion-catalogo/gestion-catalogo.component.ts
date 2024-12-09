import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AgregarProductoDialogComponent } from '../agregar-producto-dialog/agregar-producto-dialog.component';

@Component({
  selector: 'app-gestion-catalogo',
  templateUrl: './gestion-catalogo.component.html',
  styleUrls: ['./gestion-catalogo.component.scss'],
})
export class GestionCatalogoComponent implements OnInit {
  products: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(private firestore: AngularFirestore, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadProducts();
  }

  
  loadProducts() {
    this.firestore.collection('products').snapshotChanges().subscribe((data) => {
      this.products = data.map((e) => {
        const product = e.payload.doc.data() as any;
        return {
          id: e.payload.doc.id,
          ...product,
        };
      });
      this.dataSource.data = this.products;
    });
  }

 
  openAddDialog() {
    const dialogRef = this.dialog.open(AgregarProductoDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.firestore.collection('products').add(result).then(() => {
          console.log('Producto agregado exitosamente');
        });
      }
    });
  }


  deleteProduct(id: string) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.firestore.collection('products').doc(id).delete();
      console.log('Producto eliminado:', id);
    }
  }
}
