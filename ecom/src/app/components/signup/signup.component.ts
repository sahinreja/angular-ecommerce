import { UserAuthService } from './../../service/user-auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public errMessage:any = "";
  options: FormGroup;
  imageData:string
  floatLabelControl = new FormControl('male');
  constructor(private authService:UserAuthService ,
     private snakeBar:MatSnackBar , 
     private router:Router , 
     private fb:FormBuilder) { 
       this.options = fb.group({
        floatLabel:this.floatLabelControl
       })
     }

  ngOnInit(): void {
  }
  onSelectedFile(event:any){
    const file = (event.target).files[0];    
    const allowedMimeTypes = ["image/png" , "image/jpg" , "image/jpeg"]; 
    if(file && allowedMimeTypes.includes(file.type)){
      const reader = new FileReader()
      reader.onload=()=>{
        this.imageData = reader.result as string;
      }
      reader.readAsDataURL(file) 
      console.log(reader.readAsDataURL(file));
      
    }
  }

  onSubmit(f:NgForm){
    console.log(f.value);
    // this.imageData = "";
    // let image = this.imageData
    // let formData = {...f.value , image}
    // console.log(formData);
    
    this.authService.signup(f.value).subscribe(
      (res)=>{
        console.log(res);
        this.router.navigate(['/login']);
      },
      (err)=>{
        this.snakeBar.open(err.error , 'Cancel');
        this.errMessage = err.error;
        console.log(err);
      }
    )
  }

}
