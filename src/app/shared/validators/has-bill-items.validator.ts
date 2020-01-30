import { AbstractControl, ValidatorFn } from '@angular/forms';

export function hasBillItemsValidator(minimum: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const billItems = control.get('billItems').value;
    if (billItems.length >= minimum) {
      return null;
    }
    return { noBillItems: { value: `You must enter at least ${minimum} bill items.` } };
  };
}
