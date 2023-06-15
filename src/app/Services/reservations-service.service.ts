import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation, ReservationType } from '../Models/reservation';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsServiceService {

  url: string = "http://localhost:7777/reservations";
  reservations!: Reservation[];

  constructor(private http: HttpClient) { }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.url)
    .pipe(map((reservations: Reservation[]) => reservations.map(reservation => {
      this.log(`fetched reservations`)
      return new Reservation(
        reservation.reservationId,
        reservation.reservationName,
        reservation.reservationSurname,
        reservation.reservationPhone,
        reservation.reservationDate,
        reservation.reservationTableNumber,
        reservation.reservationAdditionalInfo
      );
    })),
    catchError(this.handleError<Reservation[]>('addReservation')));
  }

  getReservation(id: string): Observable<Reservation> {
    const url:string = `http://localhost:7777/reservations/${id}`;
    return this.http.get<ReservationType>(url).pipe(map(reservation => {
      this.log(`fetched reservation with id = ${id}`)
      return new Reservation(
      reservation.reservationId,
      reservation.reservationName,
      reservation.reservationSurname,
      reservation.reservationPhone,
      reservation.reservationDate,
      reservation.reservationTableNumber,
      reservation.reservationAdditionalInfo);
    }));
  }

  addReservation(reservation: ReservationType): Observable<ReservationType> {
    return this.http.post<Reservation>(this.url, reservation).pipe(
      tap((newReservation: ReservationType) => this.log(`added reservation w/ id=${reservation.reservationId}`)),
      catchError(this.handleError<ReservationType>('addReservation'))
    );
  }

  deleteReservation(id: string): Observable<void> {
    const url:string = `http://localhost:7777/reservations/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(_ => this.log(`deleted reservation with id=${id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  editReservation(reservation: ReservationType): Observable<ReservationType> {
    const url:string = `http://localhost:7777/reservations/${reservation.reservationId}`;
    return this.http.put<Reservation>(url, reservation).pipe(
      tap((newReservation: ReservationType) => this.log(`edited reservation w/ id=${reservation.reservationId}`)),
      catchError(this.handleError<ReservationType>('editReservation'))
    );
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
