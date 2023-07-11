import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public username: String = "";
  public password: String = "";
  public message: String | undefined;

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.userService.register(this.username, this.password)
      .subscribe({
        next: (resp) => {
          console.log("Successfully registered");
          this.message = resp.msg;
          this.router.navigate(["login"]);
        }, error: (err) => {
          console.error("Error registering", err);
          this.message = err.error.msg;
        }
      });
  }

}
