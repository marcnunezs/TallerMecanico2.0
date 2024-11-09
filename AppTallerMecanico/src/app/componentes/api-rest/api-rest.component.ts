import { Component, OnInit } from '@angular/core';
import { DataService, User } from 'src/app/services/api-rest.service';

@Component({
  selector: 'app-api-rest',
  templateUrl: './api-rest.component.html',
  styleUrls: ['./api-rest.component.scss'],
})
export class ApiRestComponent  implements OnInit {
  users: User[] = [];
  newUser: User = { id: 0+1, name: '', email: ''};
  editingUser: User | null = null;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadUsers()
  }

  loadUsers() {
    this.dataService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  addUser() {
    if (!this.newUser.name || !this.newUser.email) return;

    const newUser: User = {
      id: this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1,
      name: this.newUser.name,
      email: this.newUser.email,
    };

    this.dataService.createUser(newUser).subscribe((user) => {
      this.users.push(user);
      this.resetForm();
    });
  }

  updateUser(user: User) {
    this.editingUser = user;
    this.newUser.name = user.name;
    this.newUser.email = user.email
  }

  saveUser() {
    if (!this.editingUser) return;

    const updatedUser: User = {
      id: this.editingUser.id,
      name: this.newUser.name,
      email: this.newUser.email,
    };

    this.dataService.updateUser(updatedUser).subscribe((user) => {
      const index = this.users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        this.users[index] = user;
      }
      this.resetForm();
      this.editingUser = null;
    });
  }


  deleteUser(userId: number) {
    this.dataService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter(user => user.id !== userId);
    });
  }

  resetForm() {
    this.newUser = { id: 0, name: '', email: ''};
  }
}
