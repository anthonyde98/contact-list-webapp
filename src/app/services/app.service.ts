import { EventEmitter, Injectable } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import {v4 as uuidv4} from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { version as uuidVersion } from 'uuid';
 

@Injectable({
  providedIn: 'root'
})
export class AppService {
  buscador = new EventEmitter<boolean>(false);
  topMenu = new EventEmitter<string>(true);
  private firstTimeLoading = true;
  private device: DeviceInfo;
  constructor(private deviceDetectorService: DeviceDetectorService) {
    this.device = this.deviceDetectorService.getDeviceInfo();
   }

  getDeviceInfo(){
    return this.device;
  }

  private generarUUID(){
    let myUuid = uuidv4();

    return myUuid;
  }

  uuidValidateV4(uuid: string){
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
  }

  getUUIDFromLocal(){
    return localStorage.getItem('uuid');
  }

  setUUIDToLocal(){
    let myUuid = this.generarUUID();

    localStorage.setItem('uuid', myUuid);
  }

  getTokenGroup(){
    return localStorage.getItem('tokenGroup');
  }

  deleteTokenGroup(){
    localStorage.removeItem('tokenGroup');
  }

  saveDeviceDataToStorage(deviceData: string){
    localStorage.setItem('device', deviceData);
  }

  getDeviceData(){
    return JSON.parse(localStorage.getItem('device') || "");
  }

  deleteDeviceData(){
    localStorage.removeItem('device');
  }

  getFirstTime(){
    return this.firstTimeLoading;
  }

  setFirstTime(desicion: boolean){
    this.firstTimeLoading = desicion;
  } 
}
