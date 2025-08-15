import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  public formError: string = '';
  public credentials = {
    id: 0,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    admin: false,
  };
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  ngOnInit() {}
  public onSignupSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doSignup();
    }
  }
  private doSignup(): void {
    if (this.credentials.password !== this.credentials.confirmPassword) {
      this.formError = 'Passwords do not match, please try again';
      return;
    }
    this.authenticationService
      .register(this.credentials)
      .then(() =>  this.router.navigateByUrl('/list-trips'))
      .catch((err) => {
        // Set form error message
        if (err.error?.errors && err.error.errors.length > 0) {
          // Display validation errors
          this.formError = err.error.errors.map((e: any) => e.message).join(', ');
        } else if (err.error?.message) {
          this.formError = err.error.message;
        } else {
          this.formError = 'Registration failed. Please try again.';
        }
      });
  }
}
