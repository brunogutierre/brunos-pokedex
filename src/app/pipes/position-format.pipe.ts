import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positionFormat'
})
export class PositionFormatPipe implements PipeTransform {

  transform(value: number | string | undefined | null, ...args: unknown[]): string {
    if (!value)
      return '';
    
    value = value + '';

    if (value.length === 1)
      value = '00' + value;
    else if (value.length === 2)
      value = '0' + value;

    return '#' + value;
  }

}
