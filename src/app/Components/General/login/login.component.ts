import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private userService: UsersService,
    private router: Router) {

    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.compose([
        Validators.maxLength(10),
        Validators.minLength(5),
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.maxLength(10),
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
        this.userService.logIn(this.loginForm.value.username);
        this.router.navigateByUrl('home');
        break;
    }
  }

  get isLogedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  getField(field: any): AbstractControl | null{
    return this.loginForm.get(field);
   }

}
