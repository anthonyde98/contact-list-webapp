import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  buscador = new EventEmitter<boolean>(false); 
  constructor() { }

  removePhoneFormat(numero: string){
    return numero.replace(/[^0-9]/g, "");
  }
}
