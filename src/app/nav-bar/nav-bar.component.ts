import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor(   private router: Router,
    public authenticationService : AuthenticationService ) { }

   ngOnInit() {
  }

  logOut(){

    this.authenticationService.logout();
    this.router.navigate(['/login']);

  }
}
