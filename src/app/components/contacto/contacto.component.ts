import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  @Input() contacto: any;
  @Input() clicked: boolean = false;
  @ViewChild('card') card!: ElementRef;

  constructor(private renderer: Renderer2, private appServe: AppService, private router: Router) { }

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
      // this.eliminarContacto(this.contacto.id).then(() => {
      //   // haz algo
      // }).catch(() => {
      //   // captura el error
      // });
    }
  }
}
