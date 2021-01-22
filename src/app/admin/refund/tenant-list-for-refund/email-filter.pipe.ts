import { Pipe, PipeTransform } from '@angular/core';

import { Register } from 'src/app/share/model/model';

@Pipe({
  name: 'emailFilter',
  pure: false
})

export class EmailFilterPipe implements PipeTransform {

  transform(user: Register[], searchTerm: String) {
    if (!user || !searchTerm) {
      return user;
    }
    return user.filter(a => a.email.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
  }

}
