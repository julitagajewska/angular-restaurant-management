import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { User, UserType } from '../Models/user';
import { pass } from 'ngx-bootstrap-icons';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url: string = "http://localhost:7777/users";
  private _isLoggedIn: boolean = true;
  private _defaultUserImage: string = "https://plusvalleyadventure.com/wp-content/uploads/2020/11/default-user-icon-8.jpg";
  private _loggedInChange: Subject<boolean> = new Subject<boolean>();
  private _loggedInUser: User | null = null;

  users!: User[];

  constructor(private http: HttpClient) {

    this.getUsers().subscribe(response => {
      this.users = response;
    })

    this.loggedInChange.subscribe((value) => {
      this._isLoggedIn = value;
    });

    this.loadLoggedInUser().subscribe(response => {
      console.log(response);
      if(response == null){
        this.logOut();
      } else {
        this._loggedInUser = new User(
          response.userId,
          response.username,
          response.mail,
          response.phone,
          response.password,
          response.imageURL
        );

        if(this._loggedInUser != null){
          this.logIn(this._loggedInUser.username);
          console.log(this._isLoggedIn);
        }
      }
    });
  }

  loadLoggedInUser(): Observable<User> {
    let url: string = "http://localhost:7777/loggedIn";
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched logged in user`)),
      catchError(this.handleError<User>('getLoggedIn')));
  }

  get loggedInChange(): Observable<boolean> {
    return this._loggedInChange.asObservable();
  }

  public get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
  public set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  get defaultUserImage(): string {
    return this._defaultUserImage;
  }

  get loggedInUser(): User | null {
    return this._loggedInUser;
  }

  logIn(username: string) {
    let addUser: UserType;

    let user: User | any = this.users.filter(element => {
      if(element.username == username){
        addUser = {
          userId: element.userId,
          username: element.username,
          mail: element.mail,
          phone: element.phone,
          password: element.password,
          imageURL: element.imageURL
          }

          console.log("Adding user");
          this.addLoggedInUser(addUser).subscribe(response => {
           this._loggedInUser = element;
           this._loggedInChange.next(true);
          });
      }
      return element.username == username;
    });
  }

  logOut() {
    this._loggedInChange.next(false);
    this._loggedInUser = null;
    this.deleteLoggedInUser().subscribe(response => {
      console.log("Logged out");
    });
  }

  addLoggedInUser(user: UserType): Observable<UserType> {
    const url = `http://localhost:7777/loggedIn`;
    return this.http.post<void>(url, user).pipe(
      tap(_ => this.log(`Logged in user added`)),
      catchError(this.handleError<any>('addLoggedIn'))
    );
  }

  deleteLoggedInUser(): Observable<void> {
    const url = `http://localhost:7777/loggedIn`;
    return this.http.delete<void>(url).pipe(
      tap(_ => this.log(`Logged in user deleted`)),
      catchError(this.handleError<any>('deleteLoggedIn'))
    );
  }

  checkLogInData(username: string, password: string): string{
    let usernames: string[] = [];
    this.users.forEach(user => {
      usernames.push(user.username);
    })

    if(usernames.includes(username) == false){
      return 'noUserError';
    }

    let userPassword: string = '';

    let user: User | any = this.users.filter(element => {
      if(element.username == username){
        userPassword = element.password;
      }
      return element.username == username;
    });

    if(userPassword == password ){
        return 'success';
    } else {
        return 'wrongPasswordError';
    }
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
        user.password,
        user.imageURL
      );
      this.users.push(newUser)
      return newUser;
    })),
    catchError(this.handleError<User[]>('addUser')));
  }

  editUser(user: UserType): Observable<UserType> {
    const url = `http://localhost:7777/user/${user.userId}`;
    return this.http.put<User>(url, user).pipe(
      tap((newReservation: UserType) => this.log(`edited reservation w/ id=${user.userId}`)),
      catchError(this.handleError<UserType>('editReservation'))
    );
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
