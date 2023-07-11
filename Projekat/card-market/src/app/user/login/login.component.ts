import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public message: String | null;

  public loginForm: FormGroup;


  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      "username": [null, Validators.required],
      "password": [null, Validators.required]
    })
    this.message = null;
  }


  login() {
    this.userService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (resp) => {
          console.log('Successfully logged in');
          this.message = resp.msg;
          this.router.navigate(["home", this.message]);
        }, 
        error: (err) => {
          console.error('Error logging in', err);
          this.message = err.error.msg;
        }
      });
  }


}
