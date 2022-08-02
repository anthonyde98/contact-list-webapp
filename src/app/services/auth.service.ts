import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { ContactoService } from './contacto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLogged = false;
  constructor(private appService: AppService, private contactoService: ContactoService) { }

  cerrarSesion(){
    this.appService.deleteTokenGroup();
    this.appService.deleteDeviceData();
    this.isLogged = false;
    this.appService.setFirstTime(true);
  }

  iniciarSesion(tokenGroup: string, deviceData: string){
    localStorage.setItem('tokenGroup', tokenGroup);
    this.appService.saveDeviceDataToStorage(deviceData);
    this.isLogged = true;
  }

  getIsLogged(){
    return this.isLogged;
  }
}
