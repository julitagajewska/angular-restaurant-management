import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn!: boolean;

  constructor(private userService: UsersService) {
    this.userService.loggedInChange.subscribe(value => {
      this.isLoggedIn = value;
    });
  }


  ngOnInit(): void {
  }

  logOut(): void{
    this.userService.logOut();
    console.log("Próba wylogowania");
  }

}
