import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'withCharge',
  pure: true
})
export class WithChargePipe implements PipeTransform {

  transform(value: number, rates: number[]): number {
    return value + rates.reduce((acc: number, curr: number, index: number, rates: number[]) => {
      console.log({
        acc,
        curr,
        value
      });
      return acc + (value * curr);
    }, 0);
  }
}
