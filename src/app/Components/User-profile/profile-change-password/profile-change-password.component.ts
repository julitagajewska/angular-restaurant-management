import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User, UserType } from 'src/app/Models/user';
import { UsersService } from 'src/app/Services/users.service';
import { hasLowerCaseLetter, hasNumber, hasSpecialCharacter, hasUpperCaseLetter, passwordMatch } from 'src/app/Validators/password';

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.css']
})
export class ProfileChangePasswordComponent implements OnInit, OnDestroy {

  userSubscription!: Subscription;
  editPasswordForm!: FormGroup;
  user: User;
  passwordChangedAllert: boolean = false;

  constructor(
    private router: Router,
    private usersService: UsersService
  ) {

    this.user = this.usersService.loggedInUser;

    this.userSubscription = this.usersService.userChange.subscribe(value => {
      this.user = value;
    });

    this.editPasswordForm = new FormGroup({
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
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  getField(field: any): AbstractControl | null{
    return this.editPasswordForm.get(field);
  }

  changePassword(): void {
    let newUser: UserType = {
      userId: this.user.userId,
      username: this.user.username,
      mail: this.user.mail,
      phone: this.user.phone,
      password: this.editPasswordForm.value.password,
      imageURL: this.user.imageURL
    }

    this.usersService.saveEditChanges(newUser);
    this.passwordChangedAllert = true;
  }

  clickedOutside(): void {
    this.passwordChangedAllert = false;
  }

  return(): void {
    this.router.navigateByUrl('user_profile');
  }

}
