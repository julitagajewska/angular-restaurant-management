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
  private _defaultUserImage: string = "https://plusvalleyadventure.com/wp-content/uploads/2020/11/default-user-icon-8.jpg";

  private _isLoggedIn: boolean = true;
  private _loggedInChange: Subject<boolean> = new Subject<boolean>();

  private _loggedInUser!: User;
  private _userChange: Subject<User> = new Subject<User>();

  users!: User[];

  constructor(private http: HttpClient) {

    this.getUsers().subscribe(response => {
      this.users = response;
    })

    this.loggedInChange.subscribe((value) => {
      this._isLoggedIn = value;
    });


    this.userChange.subscribe((value) => {
      this._loggedInUser = value;
    });


    this.loadLoggedInUser().subscribe(response => {
      console.log(response);
      if(response == null){
        this._loggedInChange.next(false);
      } else if (response != null) {
        console.log(response);
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

  get userChange(): Observable<User> {
    return this._userChange.asObservable();
  }


  loadLoggedInUser(): Observable<User> {
    let url: string = "http://localhost:7777/loggedIn";
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched logged in user`)),
      catchError(this.handleError<User>('getLoggedIn')));
  }

  userChangedValue(user: User): void{
    this._userChange.next(user);
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

  get loggedInUser(): User {
    return this._loggedInUser;
  }

  public set loggedInUser(value: User) {
    this._loggedInUser = value;
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

  deleteUserAccount(user: User): Observable<void>{
    const url = `http://localhost:7777/users/${user.userId}`;
    return this.http.delete<void>(url).pipe(
      tap(_ => this.log(`Logged in user deleted`)),
      catchError(this.handleError<any>('deleteLoggedIn'))
    );
  }

  deleteLoggedInUser(): Observable<void> {
    const url = `http://localhost:7777/loggedIn`;
    return this.http.delete<void>(url).pipe(
      tap(_ => this.log(`Logged in user deleted`)),
      catchError(this.handleError<any>('deleteLoggedIn'))
    );
  }

  deleteUser(user: User): void {
    this.deleteUserAccount(user).subscribe(response => {
      console.log(response);
      this.deleteLoggedInUser().subscribe(r => {
        console.log(response);
        this.logOut();
      })
    })
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

  saveEditChanges(newUser: UserType): void {
    this.editUser(newUser).subscribe(response => {
      console.log(response);
      this.editLoggedInUser(newUser).subscribe(r => {
        let user = new User(
          r.userId,
          r.username,
          r.mail,
          r.phone,
          r.password,
          r.imageURL
        );
        this.loggedInUser = user;
        this.userChangedValue(user);
      })
    })
  }

  editUser(user: UserType): Observable<UserType> {
    const url = `http://localhost:7777/users/${user.userId}`;
    return this.http.put<User>(url, user).pipe(
      tap((newReservation: UserType) => this.log(`edited user w/ id=${user.userId}`)),
      catchError(this.handleError<UserType>('editReservation'))
    );
  }

  editLoggedInUser(user: UserType): Observable<UserType>{
    const url = `http://localhost:7777/loggedIn/${user.userId}`;
    return this.http.put<User>(url, user).pipe(
      tap((newReservation: UserType) => this.log(`edited logged user w/ id=${user.userId}`)),
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
