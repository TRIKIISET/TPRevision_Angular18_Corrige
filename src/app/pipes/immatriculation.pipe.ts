import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'immatriculation',
  standalone: true
})
export class ImmatriculationPipe implements PipeTransform {

  transform(value: string): string {
    return value.split('TU').join(' TU ');
  }

}
