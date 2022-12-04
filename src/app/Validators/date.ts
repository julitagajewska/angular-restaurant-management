import { AbstractControl } from "@angular/forms";

export function dateMatch(date: string) {
  return function(form: AbstractControl) {

    let inputDate: Date = new Date(form.get(date)?.value);
    let today: Date = new Date();

    console.log(inputDate.getTime());
    console.log(today.getTime());

    if(inputDate.getTime() < today.getTime()) {
      return { dateError: true };
    } else {
      return null
    }

  }
}

export function timeMatch(date: string, time: string) {
  return function(form: AbstractControl) {

    let inputTime: string = form.get(time)?.value;
    let inputDate: Date = new Date(form.get(date)?.value);

    let inputTimeArray: string[] = inputTime.split(':');

    inputDate.setHours(+inputTimeArray[0]);
    inputDate.setMinutes(+inputTimeArray[1]);

    let today: Date = new Date();

    if(inputDate.getTime() < today.getTime()) {
      return { timeError: true };
    } else {
      return null
    }

  }
}

