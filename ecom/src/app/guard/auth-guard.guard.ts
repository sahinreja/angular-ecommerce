import { UserAuthService } from './../service/user-auth.service';
import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private authService:UserAuthService , private router:Router){}


  canActivate():boolean{
    if(this.authService.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
