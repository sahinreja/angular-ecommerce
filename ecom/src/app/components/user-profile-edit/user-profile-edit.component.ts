import { ProductsService } from './../../service/products.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {
  user:any
  constructor(private productsService:ProductsService) { 

    this.productsService.getUserProfile().subscribe((res)=>{
      console.log(res);
      this.user = res;
    }, (err)=>{
      console.log(err);
    })
  }

  ngOnInit(): void {
  }

  updateDetails(f:NgForm){
    console.log(f.value);
    this.productsService.updateUser(f.value).subscribe((res)=>{
      console.log(res);
      this.productsService.getUser()
    } , (err)=>{
      console.log(err);
      this.productsService.getUser()
    })
  }

}
