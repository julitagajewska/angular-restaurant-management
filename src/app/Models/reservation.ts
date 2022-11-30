export type ReservationType = {
  reservationId: string;
  reservationName: string;
  reservationSurname: string;
  reservationPhone: string;
  reservationDate: Date;
  reservationTableNumber: number;
  reservationAdditionalInfo?: string;
}

export class Reservation {
  constructor(
    private _reservationId: string,
    private _reservationName: string,
    private _reservationSurname: string,
    private _reservationPhone: string,
    private _reservationDate: Date,
    private _reservationTableNumber: number,
    private _reservationAdditionalInfo?: string) {}

  public get reservationId(): string {
    return this._reservationId;
  }
  public set reservationId(value: string) {
    this._reservationId = value;
  }

  public get reservationName(): string {
    return this._reservationName;
  }
  public set reservationName(value: string) {
    this._reservationName = value;
  }

  public get reservationSurname(): string {
    return this._reservationSurname;
  }
  public set reservationSurname(value: string) {
    this._reservationSurname = value;
  }

  public get reservationPhone(): string {
    return this._reservationPhone;
  }
  public set reservationPhone(value: string) {
    this._reservationPhone = value;
  }

  public get reservationDate(): Date {
    return this._reservationDate;
  }
  public set reservationDate(value: Date) {
    this._reservationDate = value;
  }

  public get reservationTableNumber(): number {
    return this._reservationTableNumber;
  }
  public set reservationTableNumber(value: number) {
    this._reservationTableNumber = value;
  }

  public get reservationAdditionalInfo(): string | undefined {
    return this._reservationAdditionalInfo;
  }
  public set reservationAdditionalInfo(value: string | undefined) {
    this._reservationAdditionalInfo = value;
  }
}
