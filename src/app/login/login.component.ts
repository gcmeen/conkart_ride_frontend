import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { EventBusService } from '../_shared/event-bus.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router, private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.clearSession()
  }

  //session clear and logout not working from app component on server but working on local
  //so have to move logout function here for working app on server to clear session from client and server

  clearSession(): void {
    this.storageService.clean();
    this.authService.logout().subscribe({
      next: res => {
        console.log('logout response', res);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        window.location.replace('home')
      },
      error: err => {
        this.errorMessage = err?.error?.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
