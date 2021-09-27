import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokeHeight'
})
export class PokeHeightPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let ret = '-';

    if (value >= 0)
      ret = (value / 10) + 'm'

    return ret;
  }
}
