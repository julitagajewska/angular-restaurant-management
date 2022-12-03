import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/Models/reservation';
import { ReservationsServiceService } from 'src/app/Services/reservations-service.service';

@Component({
  selector: 'app-today-reservations',
  templateUrl: './today-reservations.component.html',
  styleUrls: ['./today-reservations.component.css']
})
export class TodayReservationsComponent implements OnInit {

  private _reservations: Reservation[] = [];

  constructor(private reservationsService: ReservationsServiceService) {
    this.reservationsService.getReservations().subscribe(response => {
      this.reservations = response;
    });
   }



  ngOnInit(): void {
  }

  public get reservations(): Reservation[] {
    return this._reservations;
  }
  public set reservations(value: Reservation[]) {
    this._reservations = value;
  }

}
