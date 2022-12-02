import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserType } from 'src/app/Models/user';
import { UsersService } from 'src/app/Services/users.service';
import { hasLowerCaseLetter, hasNumber, hasSpecialCharacter, hasUpperCaseLetter, passwordMatch, tooShort } from 'src/app/Validators/password';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  users!: User[];
  newId!: string;
  displayMailInvalid: boolean = false;
  displayUsernameInvalid: boolean = false;
  displayRegistered: boolean = false;

  constructor(private userService: UsersService) {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.compose([
        Validators.maxLength(10),
        Validators.minLength(5),
        Validators.required
      ])),
      mail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ])),
    },
    [passwordMatch('password', 'confirmPassword'),
     hasNumber('password'),
     hasUpperCaseLetter('password'),
     hasLowerCaseLetter('password'),
     hasSpecialCharacter('password')
    ]);
   }

   getField(field: any): AbstractControl | null{
    return this.registerForm.get(field);
   }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
      this.newId = this.userService.getNewId();
    });
  }

  register(): void{

    let mailTaken: boolean = this.userService.isMailTaken(this.registerForm.value.mail);
    let usernameTaken: boolean = this.userService.isUsernameTaken(this.registerForm.value.username);

    this.displayMailInvalid = mailTaken;
    this.displayUsernameInvalid = usernameTaken;

    if(mailTaken == false && usernameTaken == false){
      let newUser: UserType = {
      userId: this.newId,
      username: this.registerForm.value.username,
      mail: this.registerForm.value.mail,
      phone: this.registerForm.value.phone,
      password: this.registerForm.value.password
      }

      this.userService.addUser(newUser).subscribe(response => {
        console.log("User added!");
        this.displayRegistered = true;
      });
    }
  }
}
