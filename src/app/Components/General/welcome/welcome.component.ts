import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  private _isLoggedIn!: boolean;
  private _user!: User;

  constructor(private usersService: UsersService) {
    this._isLoggedIn = this.usersService.isLoggedIn;

    this.usersService.loggedInChange.subscribe(response => {
      this._isLoggedIn = response;
    });

    // this.usersService.userChange.subscribe(response => {
    //   this._user = response;
    // })
   }

  ngOnInit(): void {

  }

  public get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  public get user(): User {
    return this._user;
  }


}
