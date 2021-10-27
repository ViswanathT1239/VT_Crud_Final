import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser : User;
  users = [];
  constructor(private authenticationService:AuthenticationService,
    private userService: UserService) { 
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.loadAllUsers();
  }
   private loadAllUsers() {
         this.userService.getAll()
             .pipe(first())
             .subscribe(users => this.users = users);
     }

      deleteUser(id: number) {
         this.userService.delete(id)
             .pipe(first())
             .subscribe(() => this.loadAllUsers());
     }

}
