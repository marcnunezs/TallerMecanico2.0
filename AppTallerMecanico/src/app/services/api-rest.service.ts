import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(updatedUser: User): Observable<User> {
    // Corregido: nombre del parámetro consistente y tipo de retorno Observable<User>
    return this.http.put<User>(`${this.apiUrl}/${updatedUser.id}`, updatedUser);
  }

  deleteUser(id: number): Observable<void> {
    // Corregido: paréntesis y tipo de retorno
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
