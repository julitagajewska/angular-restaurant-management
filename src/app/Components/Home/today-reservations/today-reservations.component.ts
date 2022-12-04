import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter } from 'ngx-bootstrap-icons';
import { Reservation } from 'src/app/Models/reservation';
import { ReservationsServiceService } from 'src/app/Services/reservations-service.service';

@Component({
  selector: 'app-today-reservations',
  templateUrl: './today-reservations.component.html',
  styleUrls: ['./today-reservations.component.css']
})
export class TodayReservationsComponent implements OnInit {

  private _reservations: Reservation[] = [];
  private _filteredReservations: Reservation[] = [];
  private _date: Date = new Date();

  private _dateFilter: FormControl = new FormControl();

  constructor(private reservationsService: ReservationsServiceService) {
    this.reservationsService.getReservations().subscribe(response => {
      this.reservations = response;
      this.filteredReservations = this.filterReservations(this.date);
      console.log(this.reservations);
    });

    this.dateFilter.valueChanges.subscribe({
      next: val => {
        this.date = val;
        this.filteredReservations = this.filterReservations(val); },
      error: error => console.error(error)
    });
  }

  ngOnInit(): void {

  }

  filterReservations(newDate: Date): Reservation[] {

    console.log("Filtruje rezerwacje");

    let reservations: Reservation[] = [];

    let date: Date = new Date(newDate);
    let year: number = date.getFullYear();
    let month: number = date.getMonth();
    let day: number = date.getDay();

    console.log(date);
    console.log(year, month, day);

    this.reservations.forEach(element => {

      let reservationDate: Date = new Date(element.reservationDate);
      let reservationYear: number = reservationDate.getFullYear();
      let reservationMonth: number = reservationDate.getMonth();
      let reservationDay: number = reservationDate.getDay();

      if(year == reservationYear && month == reservationMonth && day == reservationDay){

        console.log("dopasowano")
        reservations.push(element);
      }
    });

    console.log(reservations);

    return reservations;
  }

  public get reservations(): Reservation[] {
    return this._reservations;
  }
  public set reservations(value: Reservation[]) {
    this._reservations = value;
  }
  public get date(): Date {
    return this._date;
  }
  public set date(value: Date) {
    this._date = value;
  }
  public get dateFilter(): FormControl {
    return this._dateFilter;
  }
  public set dateFilter(value: FormControl) {
    this._dateFilter = value;
  }
  public get filteredReservations(): Reservation[] {
    return this._filteredReservations;
  }
  public set filteredReservations(value: Reservation[]) {
    this._filteredReservations = value;
  }

}
