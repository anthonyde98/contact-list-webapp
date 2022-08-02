import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactoService } from 'src/app/services/contacto.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  @Input() contacto: any;
  @Input() clicked: boolean = false;
  @ViewChild('card') card!: ElementRef;

  constructor(private renderer: Renderer2, private router: Router, private contactoService: ContactoService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.renderer.listen(this.card.nativeElement, "click", ($event: any) => this.checkBtnsClick($event));
  }

  checkBtnsClick($event: any){
    if($event.target.id === "llamar"){
      this.clicked = false;
        window.open(`tel:${this.contacto.numero}`);
    }
    else if($event.target.id === "detalle"){
      this.router.navigateByUrl(`details/${this.contacto.id}`);
    }
    else if($event.target.id === "editar"){
      this.router.navigateByUrl(`set-contact/${this.contacto.id}`);
    }
    else if($event.target.id === "borrar"){
      this.contactoService.actualizarContacto({status: false}, this.contacto.id).then(() => {
        this.toast.info("Un contacto ha sido eliminado. Para revertir esta decisión, de click a este mensaje.", "Contacto")
        .onTap
        .pipe(take(1))
        .subscribe(() => this.recuperarContactoEliminado());
      }).catch(error => {
        this.toast.error("Hubo un error al eliminar el contacto.", "Contacto");
        console.log(error);
      });
    }
  }

  private recuperarContactoEliminado(){
    this.contactoService.actualizarContacto({status: true}, this.contacto.id).then(() =>{
      this.toast.success("Contacto recuperado.", "Contacto")
    }).catch(error => {
      this.toast.error("Hubo un error al recueprar el contacto.", "Contacto");
      console.log(error);
    });
  }
}
