import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneformat'
})
export class PhoneformatPipe implements PipeTransform {
  
  transform(number = "") {
    let formated = "(";
    
    formated += number.slice(0,3) + ") " + number.slice(3,6) + "-" + number.slice(6);
    return formated;
  }

}
