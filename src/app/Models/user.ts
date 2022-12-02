export type UserType = {
  userId: string,
  username: string,
  mail:string,
  phone: string,
  password: string
}

export class User {
  constructor(
    private _userId: string,
    private _username: string,
    private _mail: string,
    private _phone: string,
    private _password: string
  ){}

  public get userId(): string {
    return this._userId;
  }
  public set userId(value: string) {
    this._userId = value;
  }

  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }

  public get mail(): string {
    return this._mail;
  }
  public set mail(value: string) {
    this._mail = value;
  }

  public get phone(): string {
    return this._phone;
  }
  public set phone(value: string) {
    this._phone = value;
  }


  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }
}
