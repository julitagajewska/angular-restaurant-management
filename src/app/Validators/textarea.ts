import { AbstractControl } from "@angular/forms";

export function textareaToLong(textarea: string){
  return function(form: AbstractControl) {
    const input: string = form.get(textarea)?.value;

    if(input.length > 250){
      return { textareaToLongError: true };
    } else {
      return null;
    }
  }
}
