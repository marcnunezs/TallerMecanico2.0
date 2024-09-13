import { ChangeDetectionStrategy, Component, signal, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, MatDividerModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoginPage implements OnInit{
  username: string = '';
  password: string = '';

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private router: Router) {}

  ngOnInit() {}

  isFormValid(): boolean {
    return this.username !== '' && this.password !== '';
  }

  Login() {
    if (this.username !== '' && this.password !== '') {
      this.router.navigate(['/home'], { queryParams: { username: this.username } });
    } else {
      console.log("Por favor, completa todos los campos.");
    }
  }
}
