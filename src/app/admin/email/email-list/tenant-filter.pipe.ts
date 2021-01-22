import { Pipe, PipeTransform } from '@angular/core';

import { Register } from 'src/app/share/model/model';

@Pipe({
  name: 'tenantFilter',
  pure: false
})

export class TenantFilterPipe implements PipeTransform {

  transform(user: Register[], searchTerm: string) {
    if (!user || !searchTerm) {
      return user;
    }
    return user.filter(b =>
      b.email.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
