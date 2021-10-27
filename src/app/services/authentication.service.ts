import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
///import { map } from 'rxjs/operators';

import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  baseURL:string= environment.baseURL;

  constructor(private http: HttpClient) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(userId, azurePersonId): any {
////TODO
      // return this.http.get(`${this.baseURL}/User/Face?userId=${userId}&azurePersonId=${azurePersonId}`)
      //     .pipe(map(user => {
      //         return true;
      //     }));
      return true;
  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}
