import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  buscador: boolean = false;
  ruta: string = "";
  show = false;
  
  constructor(private router: Router, private appService: AppService, private usuarioService: UsuarioService, private authService: AuthService) { }

  ngOnInit(): void {
    this.eventsOrSubcribers();
  }

  activarBuscador() {
    if(this.buscador)
      this.appService.buscador.emit(false);
    else
      this.appService.buscador.emit(true);
  }

  cerrarSesion(){
    const deviceData = this.appService.getDeviceData();
    const token = this.appService.getTokenGroup();
    this.usuarioService.cerrarSesion(deviceData, token || "").then(() => {
      this.authService.cerrarSesion();
    });
  }

  eventsOrSubcribers(){
    this.appService.topMenu.subscribe(data => {
      this.ruta = data;
      
      if(this.ruta === 'auth')
        this.show = false;
      else{
        this.show = true;
      }
    })
    
    this.appService.buscador.subscribe(data => {
      this.buscador = data;
    })
  }
}
