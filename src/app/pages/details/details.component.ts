import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacto } from 'src/app/interfaces/icontacto';
import { ContactoService } from 'src/app/services/contacto.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';

@Component({ 
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  contacto!: Contacto;
  id: string = "";
  private numeroEnfocado: number | null = null;
  constructor(private rutaActiva: ActivatedRoute, private ContactoService: ContactoService, private toast: ToastrService, private router: Router, private appService: AppService) {}

  async ngOnInit(): Promise<void> {
    this.appService.topMenu.emit('details');
    this.id = this.rutaActiva.snapshot.paramMap.get('id') || "";
    await this.getContacto()
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
    }
  }

  llamar(numero: string){
    window.open(`tel:${numero}`);
  }

  enviarCorreo(correo: string){
    window.open(`mailTo:${correo}`);
  }

  manejoDeNumeros(i: number){
    if(this.numeroEnfocado === i){
      document.getElementById(i.toString())!.style.display = "none";
      this.numeroEnfocado = null;
    }
    else{
      document.getElementById(i.toString())!.style.display = "block"
      this.numeroEnfocado = i;
    }
  }
}
