import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { User, UserType } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url: string = "http://localhost:7777/users";
  private _isLoggedIn: boolean = true;
  loggedInChange: Subject<boolean> = new Subject<boolean>();

  users!: User[];

  constructor(private http: HttpClient) {
    this.loggedInChange.subscribe((value) => {
      this._isLoggedIn = value
    });
  }

  public get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
  public set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  logIn() {
    this.loggedInChange.next(true);
  }

  addUser(user: UserType): Observable<UserType> {
    return this.http.post<User>(this.url, user).pipe(
      tap((newUser: UserType) => this.log(`added user w/ id=${user.userId}`)),
      catchError(this.handleError<UserType>('adduser'))
    );
  }

  getUsers(): Observable<User[]> {
    this.users = [];
    return this.http.get<User[]>(this.url)
    .pipe(map((Users: User[]) => Users.map(user => {
      this.log(`fetched Users`)
      let newUser =  new User(
        user.userId,
        user.username,
        user.mail,
        user.phone,
        user.password
      );
      this.users.push(newUser)
      return newUser;
    })),
    catchError(this.handleError<User[]>('addUser')));
  }

  getNewId(): string {
    let indexes: number[] = [];
    this.users.forEach(user => {
      indexes.push(+user.userId);
    });
    indexes.sort(function(a, b){return a-b});
    return (indexes[indexes.length-1]+1).toString();
  }

  isMailTaken(mail: string): boolean {
    let mails: string[] = [];
    this.users.forEach(user => {
      mails.push(user.mail);
    })
    return mails.includes(mail);
  }

  isUsernameTaken(username: string): boolean {
    let usernames: string[] = [];
    this.users.forEach(user => {
      usernames.push(user.username);
    })
    return usernames.includes(username);
  }

  log(message: string): void{
    console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
