import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private _http:HttpClient, private router:Router) { }

  signup(user:any){
    return this._http.post<any>('http://localhost:3000/api/signup' , user)
  }

  login(user:any){
    return this._http.post<any>('http://localhost:3000/api/login' , user);
  }
  isLoggedIn(){
    return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token')
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.router.navigate([''])
  }
}
