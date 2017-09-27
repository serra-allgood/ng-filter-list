import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filledArray'
})
export class FilledArrayPipe implements PipeTransform {
  transform(value: number): Array<number> {
    value = value || 0;

    return (new Array(value)).fill(1);
  }
}
