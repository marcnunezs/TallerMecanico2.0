import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-agregar-producto-dialog',
  templateUrl: './agregar-producto-dialog.component.html',
  styleUrls: ['./agregar-producto-dialog.component.scss']
})
export class AgregarProductoDialogComponent {
  productForm: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      category: [data?.category || '', Validators.required],
      description: [data?.description || ''],
      price: [data?.price || null, [Validators.required, Validators.min(0)]],
      
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSave() {
    if (this.productForm.valid) {
      const productData = {
        ...this.productForm.value,
      };
      this.dialogRef.close(productData);
    }
  }

  async vibrate() {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  }
  

  onCancel() {
    this.dialogRef.close();
  }
}
