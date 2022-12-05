import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User, UserType } from 'src/app/Models/user';
import { UsersService } from 'src/app/Services/users.service';
import { isValidUrl } from 'src/app/Validators/url';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private _editForm!: FormGroup;
  private _editImageForm!: FormGroup;
  private _user!: User;

  private _changesSavedAlert: boolean = false;
  private _changeImageContainer: boolean = false;
  private _toggleDelete: boolean = false;
  private _savedAlert: boolean = false;

  private _userSubscription!: Subscription;

  constructor(
    private usersService: UsersService,
    private router: Router) {

    this._user = this.usersService.loggedInUser;

    this.userSubscription = this.usersService.userChange.subscribe(value => {
      this.user = value;
    });

    this.editImageForm = new FormGroup({
      imageURL: new FormControl('')
    }, [isValidUrl('imageURL')]);

    this.editForm = new FormGroup({
      username: new FormControl(this.user?.username, Validators.compose([
        Validators.maxLength(10),
        Validators.minLength(5),
        Validators.required
      ])),
      mail: new FormControl(this.user?.mail, Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ])),
      phone: new FormControl(this.user?.phone, Validators.compose([
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')
      ]))
    });
  }

  ngOnInit(): void {
  }

  getField(field: any): AbstractControl | null{
    return this.editForm.get(field);
  }

  changePassword(): void {
    this.router.navigateByUrl('password_change');
  }

  editUser(): void {
    let newUser: UserType = {
      userId: this.user.userId,
      username: this.editForm.value.username,
      mail: this.editForm.value.mail,
      phone: this.editForm.value.phone,
      password: this.user.password,
      imageURL: this.user.imageURL
    }

    this.savedAlert = true;
    this.usersService.saveEditChanges(newUser);
  }


  editImage(): void {
    let newUser: UserType = {
      userId: this.user.userId,
      username: this.user.username,
      mail: this.user.mail,
      phone: this.user.phone,
      password: this.user.password,
      imageURL: this.editImageForm.value.imageURL
    }

    console.log("Save toggle");
    console.log(this.editForm.errors);

    this.usersService.saveEditChanges(newUser);
  }

  clickedOutside(): void {
    this.changeImageContainer = false;
    console.log("Clicked outside " + this.savedAlert);
    this.savedAlert = false;
  }

  toggleImageChange(): void {
    this.changeImageContainer = true;
  }

  toggleDeleteUser(): void {
    this.toggleDelete = !this.toggleDelete;
  }


  deleteUser(): void {
    this.usersService.deleteUser(this._user);
    this.router.navigateByUrl('delete_success');
  }

  public get savedAlert(): boolean {
    return this._savedAlert;
  }
  public set savedAlert(value: boolean) {
    this._savedAlert = value;
  }

  public get user(): User {
    return this._user;
  }

  public set user(value: User) {
    this._user = value;
  }

  public get editForm(): FormGroup {
    return this._editForm;
  }
  public set editForm(value: FormGroup) {
    this._editForm = value;
  }

  public get changesSavedAlert(): boolean {
    return this._changesSavedAlert;
  }

  public get userSubscription(): Subscription {
    return this._userSubscription;
  }
  public set userSubscription(value: Subscription) {
    this._userSubscription = value;
  }

  public get changeImageContainer(): boolean {
    return this._changeImageContainer;
  }
  public set changeImageContainer(value: boolean) {
    this._changeImageContainer = value;
  }

  public get editImageForm(): FormGroup {
    return this._editImageForm;
  }
  public set editImageForm(value: FormGroup) {
    this._editImageForm = value;
  }
  public get toggleDelete(): boolean {
    return this._toggleDelete;
  }
  public set toggleDelete(value: boolean) {
    this._toggleDelete = value;
  }

}
