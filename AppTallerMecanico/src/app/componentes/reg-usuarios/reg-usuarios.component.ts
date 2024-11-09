import { Component, OnInit } from '@angular/core';
import { CrudfirebaseService } from 'src/app/services/crudfirebase.service';

@Component({
  selector: 'app-reg-usuarios',
  templateUrl: './reg-usuarios.component.html',
  styleUrls: ['./reg-usuarios.component.scss'],
})
export class RegUsuariosComponent  implements OnInit {
  email: string = '';
  password: string = '';
  user: any = null;

  constructor(private crudService: CrudfirebaseService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  async addUser() {
    if (this.email && this.password) {
      await this.crudService.addUser(this.email, this.password);
      this.email = '';
      this.password = '';
      this.loadUser();
    } else {
      alert('Por favor, ingresa un correo y contraseña.');
    }
  }

  async deleteUser() {
    const confirmDelete = confirm('¿Estas seguro de que deseas eliminar este usuario?');
    if (confirmDelete) {
      await this.crudService.deleteUser();
      this.user = null;
    }
  }

  async loadUser() {
    this.user = await this.crudService.getUser();
  }
}
