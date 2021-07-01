import { UserAuthService } from './../../service/user-auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:UserAuthService , private snakeBar:MatSnackBar , private router:Router) { }

  ngOnInit(): void {
  }
  login(loginForm:NgForm){
    console.log(loginForm.value);
    this.authService.login(loginForm.value).subscribe(
      (res)=>{
        console.log(res);
        localStorage.setItem('token' , res.token);
        localStorage.setItem('user_id' , res.user_id);
        this.router.navigate([''])
      },
      (err)=>{
        console.log(err);
        this.snakeBar.open(err.error , 'Cancel');
      }
    )
  }
}
