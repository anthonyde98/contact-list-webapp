import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BtnTopComponent } from './components/btn-top/btn-top.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    BtnTopComponent,
    TopMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
