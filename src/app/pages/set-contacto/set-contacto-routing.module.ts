import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetContactoComponent } from './set-contacto.component';

const routes: Routes = [
  {
    path: '',
    component: SetContactoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetContactoRoutingModule { }
