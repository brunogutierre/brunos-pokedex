import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokeWeight'
})
export class PokeWeightPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let ret = '-';

    if (value >= 0)
      ret = (value / 10) + 'kg'

    return ret;
  }

}
