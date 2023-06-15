import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../Models/product';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(value: Product[], filterValue: string): any[] {
    if (!filterValue) {
      return value;
    }
    const filteredList: Product[] = value.filter(product => {
      return product.productName.toLowerCase().includes(filterValue.toLowerCase());
    });
    return filteredList;
  }
}
