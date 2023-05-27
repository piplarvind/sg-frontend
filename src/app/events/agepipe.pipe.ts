import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agepipe'
})
export class AgepipePipe implements PipeTransform {
  transform(value: any, age: any): any {
    if (!age && !value.length) {
      console.log('null ');
      return null;
    }
    if (!age && value) {
      return value;
    }
    if (age) {
      const filteredTeam = value.filter(v => {
        if (v.age) {
          if (v.age._id === age) {
            return true;
          }
        }
      });

      return filteredTeam;
    }
  }
}
