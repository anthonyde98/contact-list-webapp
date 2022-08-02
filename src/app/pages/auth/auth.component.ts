import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode'
import { Usuario } from 'src/app/interfaces/iusuario';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loading: boolean = true;
  elementType = NgxQrcodeElementTypes.CANVAS;
  errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = "";
  private token: string | null = null;
  constructor(private appService: AppService, private usuarioService: UsuarioService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.appService.topMenu.emit('auth');
    this.isThereTokenGroup();
  }

  private isThereTokenGroup(){
    this.token = this.appService.getTokenGroup() || null;
    this.usuarioService.log(this.appService.getUUIDFromLocal() || "").subscribe(data => {
      if(data){
        this.authService.iniciarSesion(this.token || "", localStorage.getItem('uuid') || "");
        let data = this.deviceData();
        data.codigo = this.appService.getUUIDFromLocal() || "";
        let dataText = JSON.stringify(data);
        this.appService.saveDeviceDataToStorage(dataText)
        this.router.navigateByUrl('list');
      }
      else{
        this.authService.cerrarSesion();
        this.router.navigateByUrl('auth');
      }
    })
    if(this.token === '' || this.token === undefined || this.token === null){
      this.isThereAUUID();
    }
  } 

  private isThereAUUID(){
    let uuid = this.appService.getUUIDFromLocal();
    
    if(uuid === '' || uuid === undefined || uuid === null){
      this.appService.setUUIDToLocal();
      this.isThereAUUID();
    }
    else{
      if(this.appService.uuidValidateV4(uuid)){
        this.loading = false;
        let data = this.deviceData();
        data.codigo = uuid;
        let dataText = JSON.stringify(data);
        this.value = dataText;
        this.usuarioService.setTokenGroup(uuid, dataText);
      }
      else{
        this.isThereAUUID();
      }
    }
  }

  private deviceData(){
    let device: Usuario = {
      codigo: "",
      tipo: "",
      plataforma: "",
      navegador: "",
      nombre: ""
    }

    const data = this.appService.getDeviceInfo();

    device.nombre = data.device;

    const tipo = () => {
      const type = "." + data.deviceType.toLowerCase();

      if(type.indexOf("tv") > 0){
        return "tv";
      } 
      else if(type.indexOf("desktop") > 0){
        return "desktop";
      }
      else if(type.indexOf("tablet") > 0){
        return "tablet";
      }
      else if(type.indexOf("mobile") > 0 || type.indexOf("movil") > 0){
        return "mobile";
      }
      else if(plataforma() === "xbox" || plataforma() === "playstation" || plataforma() === "nintendo"){
        return "console";
      }
      else{
        return "unknown";
      }
    }

    const plataforma = () => {
      const platf = "." + data.os.toLowerCase();
      const type = "." + data.deviceType.toLowerCase();
      const nombre = "." + data.device.toLowerCase();

      if(platf.indexOf("mac") > 0 || platf.indexOf("ios") > 0 || platf.indexOf("apple") > 0 || platf.indexOf("iphone") > 0){
        return "apple";
      }
      else if(platf.indexOf("android") > 0){
        return "android";
      }
      else if(platf.indexOf("windows") > 0 || platf.indexOf("windows-phone") > 0 || platf.indexOf("windows_phone") > 0 || platf.indexOf("wp") > 0){
        return "windows";
      }
      else if(platf.indexOf("linux") > 0){
        return "linux";
      }
      else if(platf.indexOf("chrom") > 0){
        return "cros";
      }
      else if(nombre.indexOf("vita") > 0 || nombre.indexOf("ps") > 0 || nombre.indexOf("playstation") > 0 || platf.indexOf("vita") > 0 || platf.indexOf("ps") > 0 || platf.indexOf("playstation") > 0 || type.indexOf("vita") > 0 || type.indexOf("ps") > 0 || type.indexOf("playstation") > 0 ){
        return "playstation";
      }
      else if(nombre.indexOf("xbox") > 0 || platf.indexOf("xbox") > 0 || type.indexOf("xbox") > 0){
        return "xbox";
      }
      else if(nombre.indexOf("nintendo") > 0 || platf.indexOf("nintendo") > 0 || type.indexOf("nintendo") > 0){
        return "nintendo";
      }
      else{
        return "unknown";
      }
    }

    const navegador = () => {
      const nav = "." + data.browser.toLowerCase();

      if(nav.indexOf("ms") > 0 || nav.indexOf("edge") > 0 || nav.indexOf("explorer") > 0 || nav.indexOf("internet") > 0 || nav.indexOf("ie") > 0){
        return "edge";
      }
      else if(nav.indexOf("samsung") > 0){
        return "samsung";
      }
      else if(nav.indexOf("chrom") > 0){
        return "chrome";
      }
      else if(nav.indexOf("fire") > 0){
        return "firefox";
      }
      else if(nav.indexOf("safari") > 0){
        return "safari";
      }
      else{
        return "unknown";
      }
    }

    device.tipo = tipo();
    device.plataforma = plataforma();
    device.navegador = navegador();

    return device;
  }
}
