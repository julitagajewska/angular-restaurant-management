import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User, UserType } from 'src/app/Models/user';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editForm!: FormGroup;
  user!: User;

  changesSavedAlert: boolean = false;
  changeImageContainer: boolean = false;
  toggleDelete: boolean = false;
  savedAlert: boolean = false;

  userSubscription!: Subscription;

  constructor(
    private usersService: UsersService,
    private router: Router) {

    this.user = this.usersService.loggedInUser;

    this.userSubscription = this.usersService.userChange.subscribe(value => {
      this.user = value;
    });

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

  clickedOutside(): void {
    this.changeImageContainer = false;
    this.savedAlert = false;
  }

  toggleImageChange(): void {
    this.changeImageContainer = true;
  }

  toggleDeleteUser(): void {
    this.toggleDelete = !this.toggleDelete;
  }


  deleteUser(): void {
    this.usersService.deleteUser(this.user);
    this.router.navigateByUrl('delete_success');
  }
}
