import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessToAppGuard } from './guards/access-to-app.guard';
import { AccessToAuthPageGuard } from './guards/access-to-auth-page.guard';

const routes: Routes = [  
  {
    path: '',
    redirectTo: "list",
    pathMatch: 'full'
  },
  {
    path: "list",
    loadChildren: () => import('./pages/list/list.module').then(m => m.ListModule),
    canActivate: [AccessToAppGuard]
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsModule)
  },
  {
    path: 'set-contact/:id',
    loadChildren: () => import('./pages/set-contacto/set-contacto.module').then(m => m.SetContactoModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    canActivate: [AccessToAuthPageGuard]
  },
  {
    path: '**',
    redirectTo: "list",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
