import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contacto } from 'src/app/interfaces/icontacto';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-set-contacto',
  templateUrl: './set-contacto.component.html',
  styleUrls: ['./set-contacto.component.css']
})
export class SetContactoComponent implements OnInit {
  contacto!: Contacto;
  id: string | null = "";
  constructor(private rutaActiva: ActivatedRoute, private ContacService: ContactoService) { }

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.paramMap.get('id');
    if(this.id){
      this.getContacto();
    }
  }

  getContacto(){
    this.contacto = this.ContacService.getContacto(this.id) || this.contacto;
  }
}
