import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduceAtrName'
})
export class ReduceAtrNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (value === 'special-attack')
      return 's att';
    else if (value === 'special-defense')
      return 's def';

    return value;
  }

}
