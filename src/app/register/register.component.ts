import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: User = {
    firstname: '',
    lastname: '',
    mobile: '',
    username: '',
    email: '',
    password: '',
    userType:'driver'
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const { username, email, password, firstname, lastname, mobile,userType } = this.form;
    this.authService.register({ username, email, password, firstname, lastname, mobile ,userType}).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
