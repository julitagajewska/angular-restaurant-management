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
  @Output('deleteReservationId') deleteReservationIdEmitter: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deleteReservationEmitter(id: string): void {
    this.deleteReservationIdEmitter.emit(id);
  }

}
