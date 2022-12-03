import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plnPipe'
})
export class PlnPipePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return `${value} zł`
  }

}
