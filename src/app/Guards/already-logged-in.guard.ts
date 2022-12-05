import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UsersService } from '../Services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AlreadyLoggedInGuard implements CanActivate {

  constructor(private usersService: UsersService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.usersService.isLoggedIn == false) {
        console.log(this.usersService.isLoggedIn);
        return true;
      }

      return this.usersService.loggedInChange.pipe(
        map(response => {
          if(this.usersService.isLoggedIn == true){
            this.router.navigateByUrl('already_logged_in');
            return false;
          } else {
            return true;
          }
          })
        );

  }


}
