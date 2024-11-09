import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import * as QRCode from 'qrcode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent {

  scannedData: string | null = null;
  qrCodeData: string = '';
  generatedQRCode: string = ''; // Corrected variable
  scanResult: string = '';

  constructor(private router: Router) { }

  async scanQrCode() {
    await BarcodeScanner.checkPermission({ force: true });

    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      this.scannedData = result.content;
      console.log('Contenido escaneado: ', this.scannedData);

      if (this.isValidUrl(this.scannedData)) {
        window.open(this.scannedData, '_blank');
      }
    }
  }

  descargarQR() {
    if (this.scannedData) {
      const blob = new Blob([this.scannedData], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qr-code.txt';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }

  isValidUrl(url: string): boolean {
    const urlPattern = new RegExp('^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$', 'i');
    return !!urlPattern.test(url);
  }

  generateQRCode() {
    QRCode.toDataURL(this.qrCodeData, { errorCorrectionLevel: 'H' })
      .then((url: string) => {
        this.generatedQRCode = url; // Corrected assignment
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  ngOnInit() {}
}
