import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  @Output() dataFiltrada = new EventEmitter<any>();  
  filtro: string = "";
  radio: string = "nombre";
  constructor() {
    this.dataFiltrada.emit({
      nombre: this.radio,
      data: this.filtro
    });
  }

  ngOnInit(): void {
  }

  busqueda(){
    this.dataFiltrada.emit({
      nombre: this.radio,
      data: this.filtro
    });
  }

  selectRadio(data: string){
    this.radio = data;
  }
}
