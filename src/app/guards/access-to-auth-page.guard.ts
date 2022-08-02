import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessToAuthPageGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(): boolean | UrlTree {
    let response = !this.authService.getIsLogged();
    
    if(response){
      return true;
    }

    this.router.navigateByUrl('list');

    return false;
  }
  
}
