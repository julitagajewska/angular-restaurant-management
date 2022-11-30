import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reservation } from 'src/app/Models/reservation';

@Component({
  selector: 'app-reservations-table-row',
  templateUrl: './reservations-table-row.component.html',
  styleUrls: ['./reservations-table-row.component.css']
})
export class ReservationsTableRowComponent implements OnInit {

  detailsVisible: boolean = false;

  @Input('reservationParentData') reservation!: Reservation;
  @Output('deleteReservationId') deleteReservation:EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(`Table row: ${this.reservation.reservationId}`);
    console.log(this.reservation);
  }

  deleteReservationEmitter(id: string): void {
    this.deleteReservation.emit(id);
  }

}
