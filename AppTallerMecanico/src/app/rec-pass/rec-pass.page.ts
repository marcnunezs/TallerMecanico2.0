import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rec-pass',
  templateUrl: './rec-pass.page.html',
  styleUrls: ['./rec-pass.page.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, MatDividerModule, RouterModule],
})
export class RecPassPage {
  username = '';

  constructor(private router: Router) {}

  isFormValid(): boolean {
    return this.username !== '';
  }

  Rec() {
    if (this.username !== '') {
      this.router.navigate(['/login'], { queryParams: { username: this.username } });
    } else {
      console.log("Por favor, completa todos los campos.");
    }
  }

}
