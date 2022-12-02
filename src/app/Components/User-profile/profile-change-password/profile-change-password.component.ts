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

  private _userSubscription!: Subscription;
  private _editPasswordForm!: FormGroup;
  private _user: User;
  private _passwordChangedAllert: boolean = false;

  constructor(
    private router: Router,
    private usersService: UsersService
  ) {

    this._user = this.usersService.loggedInUser;

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
    return this._editPasswordForm.get(field);
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
    console.log("Clicked outisde");
  }

  return(): void {
    this.router.navigateByUrl('user_profile');
  }


  get editPasswordForm(): FormGroup {
    return this._editPasswordForm;
  }

  public set editPasswordForm(value: FormGroup) {
    this._editPasswordForm = value;
  }

  public get user(): User {
    return this._user;
  }
  public set user(value: User) {
    this._user = value;
  }

  public get userSubscription(): Subscription {
    return this._userSubscription;
  }
  public set userSubscription(value: Subscription) {
    this._userSubscription = value;
  }

  public get passwordChangedAllert(): boolean {
    return this._passwordChangedAllert;
  }
  public set passwordChangedAllert(value: boolean) {
    this._passwordChangedAllert = value;
  }

}
