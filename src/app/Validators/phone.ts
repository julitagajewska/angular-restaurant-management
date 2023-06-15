import { AbstractControl } from "@angular/forms";

export function phoneToLong(phone: string){
  return function(form: AbstractControl) {
    const input: string = form.get(phone)?.value;

    if(input.length > 15){
      return { phoneToLongError: true };
    } else {
      return null;
    }

  }
}

export function phoneToShort(phone: string){
  return function(form: AbstractControl) {
    const input: string = form.get(phone)?.value;

    if(input.length < 9){
      return { phoneToShortError: true };
    } else {
      return null;
    }

  }
}
