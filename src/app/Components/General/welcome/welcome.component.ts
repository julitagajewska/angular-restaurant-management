import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  isLoggedIn!: boolean;
  user!: User;

  constructor(private usersService: UsersService) {
    this.isLoggedIn = this.usersService.isLoggedIn;

    this.usersService.loggedInChange.subscribe(response => {
      this.isLoggedIn = response;
    });
   }

  ngOnInit(): void { }


}
