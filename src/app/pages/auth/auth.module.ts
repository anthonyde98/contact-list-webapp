import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { AuthComponent } from './auth.component';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgxQRCodeModule
  ]
})
export class AuthModule { }
