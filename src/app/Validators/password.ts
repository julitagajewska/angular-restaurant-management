import { AbstractControl } from "@angular/forms";
import { pass } from "ngx-bootstrap-icons";

export function hasNumber(password: string) {
  return function(form: AbstractControl) {
    const regex: RegExp = new RegExp(/\d/);
    const passwordValue = form.get(password)?.value;

    const valid = regex.test(passwordValue);

    return valid ? null : { hasNumberError: true };
  }
}

export function hasUpperCaseLetter(password: string) {
  return function(form: AbstractControl) {
    const regex: RegExp = new RegExp(/[A-Z]/);
    const passwordValue = form.get(password)?.value;

    const valid = regex.test(passwordValue);

    return valid ? null : { hasUpperCaseLetterError: true };
  }
}

export function hasLowerCaseLetter(password: string) {
  return function(form: AbstractControl) {
    const regex: RegExp = new RegExp(/[a-z]/);
    const passwordValue = form.get(password)?.value;

    const valid = regex.test(passwordValue);

    return valid ? null : { hasLowerCaseLetterError: true };
  }
}

export function hasSpecialCharacter(password: string) {
  return function(form: AbstractControl) {
    const regex: RegExp = new RegExp(/[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?]/);
    const passwordValue = form.get(password)?.value;

    const valid: boolean = regex.test(passwordValue);

    return valid ? null : { hasSpecialCharacterError: true };
  }
}

export function tooShort(password: string){
  return function(form: AbstractControl) {
    const passwordValue = form.get(password)?.value;
    let valid!: boolean;
    if(passwordValue.length < 5) { valid = false }

    return valid ? null : { tooShortError: true };
  }
}

export function passwordMatch(password: string, confirmPassword: string){
  return function(form: AbstractControl) {
    const passwordValue = form.get(password)?.value;
    const confirmPasswordValue = form.get(confirmPassword)?.value;

    if(passwordValue === confirmPasswordValue){
      return null;
    }

    return { passwordMismatchError: true };
  }
}
