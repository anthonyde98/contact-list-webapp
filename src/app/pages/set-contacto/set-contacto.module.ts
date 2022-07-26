import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetContactoRoutingModule } from './set-contacto-routing.module';
import { SetContactoComponent } from './set-contacto.component';
import { FormularioComponent } from 'src/app/components/formulario/formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SetContactoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    SetContactoRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SetContactoModule { }
