import { Pipe, PipeTransform } from '@angular/core';

import { Product } from 'src/app/share/model/model';

@Pipe({
  name: 'product',
  pure: false
})

export class ProductPipe implements PipeTransform {

  transform(products: Product[], searchTerm: string) {
    if (!products || !searchTerm) {
      return products;
    }
    return products.filter(product =>
      product.productName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}
