import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Reservation, ReservationType } from 'src/app/Models/reservation';
import { ReservationsServiceService } from 'src/app/Services/reservations-service.service';
import { DatePipe } from '@angular/common';
import {Location} from '@angular/common';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {

  formModel!: FormGroup;
  reservationId!: string;
  reservation!: Reservation;
  reservationDate!: Date
  reservationTime!: Time;
  changesSavedAlert: boolean = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private reservationsService: ReservationsServiceService,
    private datePipe: DatePipe,
    private location: Location) {
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
    this.getReservation();
  }

  updateReservation(): void{
    let newDate = new Date(this.formModel.value.date);
    let timeArray = this.formModel.value.time.split(":");
    newDate.setHours(+timeArray[0],+timeArray[1]);

    let newReservation: ReservationType = {
      reservationId: this.reservation.reservationId,
      reservationName: this.formModel.value.name,
      reservationSurname: this.formModel.value.surname,
      reservationPhone: this.formModel.value.phone,
      reservationDate: newDate,
      reservationTableNumber:this.formModel.value.table,
      reservationAdditionalInfo:this.formModel.value.additionalInformation,
    }

    this.reservationsService.editReservation(newReservation).subscribe(respone => {
      this.changesSavedAlert = true;
    });
  }

  getReservation(): void{
    this.reservationId = this.activatedRoute.snapshot.params['id'];
    this.reservationsService.getReservation(this.reservationId).subscribe(response => {
      this.reservation = response;

      this.reservationDate = response.reservationDate;
      let formDate: string | null;
      let formTime: string | null;
      formDate = this.datePipe.transform(this.reservationDate, 'yyyy-MM-dd');
      formTime = this.datePipe.transform(this.reservationDate, 'HH:mm');

      this.formModel = new FormGroup({
        name: new FormControl(response.reservationName, Validators.required),
        surname: new FormControl(response.reservationSurname, Validators.required),
        phone: new FormControl(response.reservationPhone, Validators.required),
        date: new FormControl(formDate, Validators.required),
        time: new FormControl(formTime, Validators.required),
        table: new FormControl(response.reservationTableNumber, Validators.required),
        additionalInformation: new FormControl(response.reservationAdditionalInfo)
      });
    });
  }

  goBack(): void {
    console.log("Back clicked");
    this.location.back();
  }

  clickedOutside(): void {
    this.changesSavedAlert = false;
  }

}
