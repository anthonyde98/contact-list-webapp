import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  buscador: boolean = false;
  ruta: string[] = [];
  constructor(private router: Router, private appService: AppService) { }

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
    
  }

  eventsOrSubcribers(){
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
        this.ruta = event.url.replace("/", "").split("/");
      }
    });
    this.appService.buscador.subscribe(data => {
      this.buscador = data;
    })
  }
}
