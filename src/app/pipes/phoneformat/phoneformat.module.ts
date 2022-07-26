import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneformatPipe } from './phoneformat.pipe';

@NgModule({
  declarations: [
    PhoneformatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [PhoneformatPipe]
})
export class PhoneformatModule { }
