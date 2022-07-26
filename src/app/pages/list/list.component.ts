import { Component, OnInit } from '@angular/core';
import { Contacto } from 'src/app/interfaces/icontacto';
import { AppService } from 'src/app/services/app.service';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  contactos!: Contacto[];
  buscador: boolean = false;
  clicked: number | undefined;
  constructor(private appService: AppService, private contactoService: ContactoService) { }

  ngOnInit(): void {
    this.getContactos();

    this.appService.buscador.subscribe(data => {
      this.buscador = data;
    })
  }

  setActualContactClicked(i: number){
    this.clicked = i === this.clicked ? undefined : i;
  }

  getContactos(){
    this.contactos = this.contactoService.getContactos()
  }

}
