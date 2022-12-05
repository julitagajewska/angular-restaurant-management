import { AbstractControl } from "@angular/forms";

export function isValidUrl(imageURL: string){
  return function(form: AbstractControl) {
    const input = form.get(imageURL)?.value;

    try {
      console.log("AUAU")
      console.log(new URL(input));
      return null;
    } catch (err) {
      return { urlError: true };
    }
  }
}
