import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './../../service/products.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddressDialogComponent } from '../address-dialog/address-dialog.component';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  // hideForm:any = true;
  address:any;
  pinCode:any = ""
  cartProducts:any
  user_id:any;
  addressForm:any = false;
  addressId:any;
  constructor(public productService:ProductsService , private router:ActivatedRoute , private route:Router,public dialog: MatDialog) {
    // localStorage.getItem('user')
    // this.productService.getAddress()
    // console.log(this.productService.cartProducts);
    this.productService.getTotalAddress()
    // const user_id = this.router.snapshot.paramMap.get('id');
    // this.user_id = user_id;
    // this.productService.getAddress(user_id).subscribe((res)=>{
    //   console.log(res);
    //        this.address = res;
    //        console.log(this.address);
           
    // } , (err)=>{
    //   console.log(err);
    // })
   }

  ngOnInit(): void {
  }

  submitAddress(f:NgForm){
    console.log(f.value);
    // let user_id = 
    this.productService.postAddress(this.user_id , f.value).subscribe((res)=>{
      console.log(res);
      this.route.navigate(['/order-summary'])
    } , (err)=>{
      console.log(err);
    })
  }

  onSelectionChange(id:any){
    console.log(id);
    this.addressId = id;
  }
  showForm(){
    this.addressForm = true;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddressDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  delete(id:any){
    console.log(id);
    console.log(typeof(id));
    this.productService.deleteAddress(id).subscribe((res)=>{
      console.log(res);
      this.productService.getTotalAddress()
    } , (err)=>{
      console.log(err);
      this.productService.getTotalAddress()
    })
  }


  checkOut(f:NgForm){
    console.log('checkOut id' , f.value.address);
    this.productService.checkOut(f.value.address)
  }
}


