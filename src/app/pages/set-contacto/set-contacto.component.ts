import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contacto } from 'src/app/interfaces/icontacto';
import { AppService } from 'src/app/services/app.service';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-set-contacto',
  templateUrl: './set-contacto.component.html',
  styleUrls: ['./set-contacto.component.css']
})
export class SetContactoComponent implements OnInit {
  contacto!: Contacto;
  id: string = "";
  constructor(private rutaActiva: ActivatedRoute, private ContactoService: ContactoService, private toast: ToastrService, private router: Router, private appService: AppService) { }

  async ngOnInit(): Promise<void> {
    this.appService.topMenu.emit('set-contact');
    this.id = this.rutaActiva.snapshot.paramMap.get('id') || "";
    if(this.id){
      await this.getContacto();
    }
  }

  async getContacto(){
    let contacto: any = await this.ContactoService.obtenerContacto(this.id);
    if(!contacto){
      setTimeout(() => {
        this.toast.error("No se encontró este contacto.", "Contacto");
      }, 1000);
      this.router.navigateByUrl("list");
    }
    else{
      this.contacto = contacto;
      this.contacto.id = this.id;
    }
  }
}
