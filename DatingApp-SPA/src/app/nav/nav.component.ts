import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.model = {};
  }

  login() {
      this.authService.login(this.model).subscribe(next => {
        console.log('success log');
      }, error => {
        console.log('error this');
      });
  }


  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }
}
