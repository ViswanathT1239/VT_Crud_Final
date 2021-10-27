import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL: string = environment.baseURL;
  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<User[]>(`${this.baseURL}/users`);
  }

  register(user: any) {
      return this.http.post(`${this.baseURL}/users`, user);
  }

  delete(id: number) {
      return this.http.delete(`${this.baseURL}/users/${id}`);
  }
}
