import { Pipe, PipeTransform } from '@angular/core';

import { Register } from 'src/app/share/model/model';

@Pipe({
  name: 'filter',
  pure: false
})

export class FilterPipe implements PipeTransform {

  transform(user: Register[], searchTerm: string) {

    if (!user || !searchTerm) {
      return user;
    }
    return user.filter(tenant =>
      tenant.country.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
