import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UsersService } from '../Services/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private usersService: UsersService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.usersService.isLoggedIn == true) {
      return true;
    }

    return this.usersService.loggedInChange.pipe(
      map(response => {
        if(this.usersService.isLoggedIn == false){
          this.router.navigateByUrl('access_denied');
          return false;
        } else {
          return true;
        }
        })
      );
  }

}
