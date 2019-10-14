import { ValidatorFn, AbstractControl } from '@angular/forms';

export function decimalAmountValidator(isNullable: boolean = false): ValidatorFn {
    const decimalRegex = /^\d+(\.\d{1,2})?$/;
    return (control: AbstractControl): {[key: string]: any} | null => {
        if (!control.value && isNullable) {
            return null;
        }
        const isDecimal = decimalRegex.test(control.value);
        return isDecimal ? null : { 'notDecimal': {value: control.value }};
    }
}