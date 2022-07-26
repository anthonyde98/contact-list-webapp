import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loading: boolean = false;
  elementType = NgxQrcodeElementTypes.CANVAS;
  errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = "Hola como estan";
  constructor() { }

  ngOnInit(): void {
  }

}
