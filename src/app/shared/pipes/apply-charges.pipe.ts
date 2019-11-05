import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'applyCharges'
})
export class ApplyChargesPipe implements PipeTransform {

  transform(value: number, extraChargesRate: number): number {
    return value + (value * extraChargesRate);
  }

}
