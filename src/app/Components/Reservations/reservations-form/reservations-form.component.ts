import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reservation, ReservationType } from 'src/app/Models/reservation';
import { ReservationsServiceService } from 'src/app/Services/reservations-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservations-form',
  templateUrl: './reservations-form.component.html',
  styleUrls: ['./reservations-form.component.css']
})
export class ReservationsFormComponent implements OnInit {

  formModel!: FormGroup;
  @Input('newIdParentData') newId!: string;
  @Output ('newReservation') newReservationEmitter:EventEmitter<ReservationType> = new EventEmitter();

  constructor(private reservationsService: ReservationsServiceService) {
    this.formModel = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      table: new FormControl('', Validators.required),
      additionalInformation: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  addReservation(): void {
    let newDate = new Date(this.formModel.value.date);
    let timeArray = this.formModel.value.time.split(":");
    newDate.setHours(+timeArray[0],+timeArray[1]);
    console.log(newDate);
    let newReservation: ReservationType = {
      reservationId: this.newId,
      reservationName: this.formModel.value.name,
      reservationSurname: this.formModel.value.surname,
      reservationPhone: this.formModel.value.phone,
      reservationDate: newDate,
      reservationTableNumber:this.formModel.value.table,
      reservationAdditionalInfo:this.formModel.value.additionalInformation,
    }

    this.newReservationEmitter.emit(newReservation);
  }
}
