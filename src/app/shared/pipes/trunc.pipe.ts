import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trunc'
})
export class TruncPipe implements PipeTransform {

  transform(value: string, maxSymbols: number): string {
    if (value.length <=maxSymbols) {
      return value;
    }
    return value.slice(0, maxSymbols) + '...';
  }

}
