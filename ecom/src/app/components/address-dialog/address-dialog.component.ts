import { ProductsService } from './../../service/products.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.css']
})
export class AddressDialogComponent implements OnInit {
  user_id:any
  constructor(private productService:ProductsService) {
    this.user_id = localStorage.getItem('user_id');
   }

  ngOnInit(): void {
  }


  submitAddress(f:NgForm){
    console.log(f.value);
    // let user_id = 
    this.productService.postAddress(this.user_id , f.value).subscribe((res)=>{
      console.log(res);
      this.productService.getTotalAddress()
      // this.route.navigate(['/order-summary'])
    } , (err)=>{
      console.log(err);
    })
  }

}
