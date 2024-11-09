import { ChangeDetectionStrategy, Component, signal, OnInit} from '@angular/core';
import { RouterModule, Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoginPage implements OnInit{
  usuario: string = '';
  password: string = '';
  errors: string[] = [];

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private router: Router, private authService: AuthService) {}

  async login() {
    if (this.usuario && this.password) {
      const isAuthenticated = await this.authService.signIn(this.usuario, this.password);

      if (isAuthenticated) {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            user: this.usuario,
          },
        };
        this.router.navigate(['/home'], navigationExtras);
      }
    } else {
      alert('Por favor, ingresa tu correo y contraseña.')
    }
  }

  ngOnInit() {}

  isFormValid(): boolean {
    return this.usuario !== '' && this.password !== '';
  }

  Login() {
    if (this.usuario !== '' && this.password !== '') {
      this.router.navigate(['/home'], { queryParams: { username: this.usuario } });
    } else {
      console.log("Por favor, completa todos los campos.");
    }
  }
}
