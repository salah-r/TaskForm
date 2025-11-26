import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ageValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // No value, no validation error
    }

    const dob = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dob.getDate())
    ) {
      age--;
    }

    if (age > 25 || age < 3) {
      return { invalidAge: true };
    }

    return null;
  };
}
