import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contacto } from 'src/app/interfaces/icontacto';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  contacto!: Contacto;
  id: string | null = "";
  constructor(private rutaActiva: ActivatedRoute, private ContacService: ContactoService) {
    this.contacto = {
      nombre: "",
      relacion: "",
      numeros: [""],
      color: "",
      descripcion: "",
      correo: ""
    }
   }

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.paramMap.get('id');
    this.getContacto()
  }

  getContacto(){
    this.contacto = this.ContacService.getContacto(this.id) || this.contacto;
  }

  llamar(numero: string){
    window.open(`tel:${numero}`);
  }

  enviarCorreo(correo: string){
    window.open(`mailTo:${correo}`);
  }
}
