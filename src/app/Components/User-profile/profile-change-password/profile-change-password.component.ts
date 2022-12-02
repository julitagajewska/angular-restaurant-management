import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { hasLowerCaseLetter, hasNumber, hasSpecialCharacter, hasUpperCaseLetter, passwordMatch } from 'src/app/Validators/password';

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.css']
})
export class ProfileChangePasswordComponent implements OnInit {

  private _editPasswordForm!: FormGroup;

  constructor(
    private router: Router
  ) {
    this._editPasswordForm = new FormGroup({
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

  ngOnInit(): void {
  }

  getField(field: any): AbstractControl | null{
    return this._editPasswordForm.get(field);
  }

  changePassword(): void {

  }

  return(): void {
    this.router.navigateByUrl('user_profile');
  }


  get editPasswordForm(): FormGroup {
    return this._editPasswordForm;
  }

}
