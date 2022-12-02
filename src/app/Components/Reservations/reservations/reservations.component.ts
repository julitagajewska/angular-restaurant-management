import { Component, OnInit } from '@angular/core';
import { Reservation, ReservationType } from 'src/app/Models/reservation';
import { ReservationsServiceService } from 'src/app/Services/reservations-service.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations!: Reservation[];
  newId!: string;
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
    let indexes: number[] = [];

    this.reservations.forEach(reservation => {
      indexes.push(+reservation.reservationId);
    });

    indexes.sort(function(a, b){return a-b});

    return (indexes[indexes.length-1]+1).toString();
  }

  addReservation(reservation: ReservationType): void {
    reservation.reservationId = this.getNewId();
    this.reservationsService.addReservation(reservation).subscribe(response => {
      this.getReservations();
    })
  }

}
