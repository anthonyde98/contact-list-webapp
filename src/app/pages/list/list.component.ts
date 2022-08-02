import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contacto } from 'src/app/interfaces/icontacto';
import { AppService } from 'src/app/services/app.service';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  contactos!: Observable<Contacto[]> 
  buscador: boolean = false;
  clicked: number | undefined;
  noContactos: boolean = false;
  isSearchingData = false;
  loading: boolean;
  constructor(private appService: AppService, private contactoService: ContactoService) { 
    this.loading = true;
  }

  ngOnInit(): void {
    if(this.appService.getFirstTime()){
      this.loadFirstTime();
    }
    else{
      this.load();
      this.loading = false;
    }
  }

  setActualContactClicked(i: number){
    this.clicked = i === this.clicked ? undefined : i;
  }

  getContactos(event?: any){
    if(event.data !== ""){
      this.isSearchingData = true;
    }
    else{
      this.isSearchingData = false;
    }

    this.contactos = this.contactoService.obtenerContactosConFiltro({
      nombre: event.nombre,
      dato: event.data
    });

    this.contactos.subscribe(contactos => {
      this.noContactos = contactos.length === 0;
    });
  }

  loadFirstTime(){
    setTimeout(() => {
      this.load();
      this.loading = false;
    }, 2000);
  }

  load(){
    this.appService.topMenu.emit('list');
    this.getContactos({nombre: "nombre", data: ""});

    this.appService.buscador.subscribe(data => {
      this.buscador = data;

      if(this.buscador === false){
        if(this.isSearchingData){
          this.getContactos({nombre: "nombre", data: ""});
        }
      }
      else{
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      } 
    })

    this.appService.setFirstTime(false);
  }

  ngOnDestroy(){
    this.isSearchingData = false;
    this.appService.buscador.emit(false)
  }
}
