import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reservation } from 'src/app/Models/reservation';
import { ReservationsServiceService } from 'src/app/Services/reservations-service.service';

@Component({
  selector: 'app-reservations-table',
  templateUrl: './reservations-table.component.html',
  styleUrls: ['./reservations-table.component.css']
})
export class ReservationsTableComponent implements OnInit {

  @Input('reservationsParentData') reservations!: Reservation[];
  @Output('deleteReservationId') deleteReservationIdEmitter: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deleteReservation(id: string): void{
    this.deleteReservationIdEmitter.emit(id);
  }
}
