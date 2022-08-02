import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { PhoneformatModule } from 'src/app/pipes/phoneformat/phoneformat.module';



@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    PhoneformatModule
  ]
})
export class DetailsModule { }
