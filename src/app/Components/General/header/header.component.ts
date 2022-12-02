import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedIn!: boolean;
  logInSubscription!: Subscription;

  constructor(
    private userService: UsersService,
    private router: Router) {
    this.logInSubscription = this.userService.loggedInChange.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.logInSubscription.unsubscribe();
  }

  logOut(): void{
    this.userService.logOut();
    this.router.navigateByUrl('');
  }

}
