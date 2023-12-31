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
  buttonToggles: boolean[] = [false, false, false, false, false, false];

  logInSubscription: Subscription;

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

  toggleButtons(index: number): void {
    let i: number = 0;
    for(i; i<this.buttonToggles.length; i++){
      this.buttonToggles[i] = false;
    }
    this.buttonToggles[index] = true;
    console.log(this.buttonToggles);
  }

}
