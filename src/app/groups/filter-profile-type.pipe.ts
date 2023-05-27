import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProfileType'
})
export class FilterProfileTypePipe implements PipeTransform {
  transform(profileTypes: any[], args?: any): any {
    console.log('profileTypes:::::::::::::::::::::::', profileTypes);
    if (args) {
      return profileTypes.filter(item => item._id === !args);
    }
    console.log('args::', args);
    return profileTypes;
  }
}
