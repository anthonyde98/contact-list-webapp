import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { ContactoComponent } from 'src/app/components/contacto/contacto.component';
import { BuscadorComponent } from 'src/app/components/buscador/buscador.component';
import { PhoneformatModule } from 'src/app/pipes/phoneformat/phoneformat.module';


@NgModule({
  declarations: [
    ListComponent,
    ContactoComponent,
    BuscadorComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    PhoneformatModule
  ]
})
export class ListModule { }
