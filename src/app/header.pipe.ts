import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'header'
})
export class HeaderPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
