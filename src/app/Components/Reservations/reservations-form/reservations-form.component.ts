import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Reservation, ReservationType } from 'src/app/Models/reservation';
import { ReservationsServiceService } from 'src/app/Services/reservations-service.service';
import { HttpClient } from '@angular/common/http';
import { dateMatch, timeMatch } from 'src/app/Validators/date';
import { textareaToLong } from 'src/app/Validators/textarea';
import { phoneToLong, phoneToShort } from 'src/app/Validators/phone';

@Component({
  selector: 'app-reservations-form',
  templateUrl: './reservations-form.component.html',
  styleUrls: ['./reservations-form.component.css']
})
export class ReservationsFormComponent implements OnInit {

  formModel!: FormGroup;

  private _addedReservationsAlert: boolean = false;

  @Input('newIdParentData') newId!: string;
  @Output ('newReservation') newReservationEmitter:EventEmitter<ReservationType> = new EventEmitter();

  constructor(private reservationsService: ReservationsServiceService) {

    this.formModel = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^[ a-zA-Z\-\’]+$/)
      ])),
      surname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^[ a-zA-Z\-\’]+$/)
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
      ])),
      date: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      time: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      table: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^[0-9]*$/)
      ])),
      additionalInformation: new FormControl(''),
    },[dateMatch('date'),
       timeMatch('date', 'time'),
       textareaToLong('additionalInformation'),
       phoneToShort('phone'),
       phoneToLong('phone')]
    );
  }

  ngOnInit(): void {
  }

  addReservation(): void {
    let newDate = new Date(this.formModel.value.date);
    let timeArray = this.formModel.value.time.split(":");
    newDate.setHours(+timeArray[0],+timeArray[1]);

    let newReservation: ReservationType = {
      reservationId: '',
      reservationName: this.formModel.value.name,
      reservationSurname: this.formModel.value.surname,
      reservationPhone: this.formModel.value.phone,
      reservationDate: newDate,
      reservationTableNumber:this.formModel.value.table,
      reservationAdditionalInfo:this.formModel.value.additionalInformation,
    }

    this.newReservationEmitter.emit(newReservation);
    this.addedReservationsAlert = true;
  }

  getField(field: any): AbstractControl | null{
    return this.formModel.get(field);
  }

  clickedOutside(): void {
    this.addedReservationsAlert = false;
  }

  public get addedReservationsAlert(): boolean {
    return this._addedReservationsAlert;
  }
  public set addedReservationsAlert(value: boolean) {
    this._addedReservationsAlert = value;
  }
}

