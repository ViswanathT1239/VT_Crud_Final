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
      user.balance = 10000;
      return this.http.post(`${this.baseURL}/user`, user);
  }

  delete(id: number) {
      return this.http.delete(`${this.baseURL}/user/${id}`);
  }
}
