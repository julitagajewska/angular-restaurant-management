import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  wrongUsername: boolean = false;
  wrongPassword: boolean = false;

  constructor(private userService: UsersService) {

    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(response => {
      console.log(response);
    });
  }

  login(): void {
    let response: string = this.userService.checkLogInData(this.loginForm.value.username, this.loginForm.value.password);

    console.log("Próbuję się zalogować.");

    this.wrongUsername = false;
    this.wrongPassword = false;

    switch(response){
      case 'noUserError':
        this.wrongUsername = true;
        break;
      case 'wrongPasswordError':
        this.wrongPassword = true;
        break;
      case 'success':
        this.wrongUsername = false;
        this.wrongPassword = false;
        this.userService.logIn();
        break;
    }
  }

  get isLogedIn(): boolean {
    return this.userService.isLoggedIn;
  }

}
