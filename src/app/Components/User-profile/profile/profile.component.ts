import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserType } from 'src/app/Models/user';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private _editForm!: FormGroup;
  private _user!: User | null;
  private _changesSavedAlert: boolean = false;

  constructor(
    private usersService: UsersService,
    private router: Router) {

    this._user = this.usersService.loggedInUser;

    this._editForm= new FormGroup({
      username: new FormControl(this._user?.username, Validators.compose([
        Validators.maxLength(10),
        Validators.minLength(5),
        Validators.required
      ])),
      mail: new FormControl(this._user?.mail, Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ])),
      phone: new FormControl(this._user?.phone, Validators.compose([
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')
      ]))
    });
  }

  ngOnInit(): void {
  }

  get user(): User | null {
    return this._user;
  }
  get editForm(): FormGroup {
    return this._editForm;
  }

  public get changesSavedAlert(): boolean {
    return this._changesSavedAlert;
  }

  getField(field: any): AbstractControl | null{
    return this.editForm.get(field);
  }

  changePassword(): void {
    this.router.navigateByUrl('password_change');
  }

  editUser(): void {
    let newUser: UserType = {
      userId: this.user?.userId,

    }
  }

}
