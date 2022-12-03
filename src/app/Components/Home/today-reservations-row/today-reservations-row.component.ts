import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/Models/reservation';

@Component({
  selector: 'app-today-reservations-row',
  templateUrl: './today-reservations-row.component.html',
  styleUrls: ['./today-reservations-row.component.css']
})
export class TodayReservationsRowComponent implements OnInit {

  @Input('reservationParentData') reservation!: Reservation;

  constructor() { }

  ngOnInit(): void {
  }

}
