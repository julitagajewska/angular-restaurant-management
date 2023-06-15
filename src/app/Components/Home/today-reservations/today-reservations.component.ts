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

  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];
  date: Date = new Date();

  dateFilter: FormControl = new FormControl();

  constructor(private reservationsService: ReservationsServiceService) {
    this.reservationsService.getReservations().subscribe(response => {
      this.reservations = response;
      this.filteredReservations = this.filterReservations(this.date);
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
    let reservations: Reservation[] = [];

    let date: Date = new Date(newDate);
    let year: number = date.getFullYear();
    let month: number = date.getMonth();
    let day: number = date.getDay();

    this.reservations.forEach(element => {

      let reservationDate: Date = new Date(element.reservationDate);
      let reservationYear: number = reservationDate.getFullYear();
      let reservationMonth: number = reservationDate.getMonth();
      let reservationDay: number = reservationDate.getDay();

      if(year == reservationYear && month == reservationMonth && day == reservationDay){
        reservations.push(element);
      }
    });

    return reservations;
  }
}
