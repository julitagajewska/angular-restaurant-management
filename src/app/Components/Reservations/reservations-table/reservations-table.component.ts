import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Reservation } from 'src/app/Models/reservation';
import { ReservationsServiceService } from 'src/app/Services/reservations-service.service';

@Component({
  selector: 'app-reservations-table',
  templateUrl: './reservations-table.component.html',
  styleUrls: ['./reservations-table.component.css']
})
export class ReservationsTableComponent implements OnInit {

  reservation!: Reservation;
  reservations!: Reservation[];

  @Output('newId') newIdEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private reservationsService: ReservationsServiceService) { }

  ngOnInit(): void {
    this.getReservations();
  }

  deleteReservation(id: string):void {
    console.log(`Usuwam ${id}`);
    this.reservationsService.deleteReservation(id).subscribe(response => {
      this.getReservations();
    });

  }

  getReservations(): void {
    this.reservationsService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
    })
  }

  getNewId(): string {

  }

}
