import { Pipe, PipeTransform } from '@angular/core';
import { Contactus } from 'src/app/share/model/model';

@Pipe({
  name: 'notificationFilter'
})
export class NotificationFilterPipe implements PipeTransform {


  transform(user: Contactus[], searchTerm: string) {
    if (!user || !searchTerm) {
      return user;
    }
    return user.filter(b =>
      b.subject.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
