import { NgForm } from '@angular/forms';
import { ProductsService } from './../../service/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public item:any;
  public cartItem:any
  public text:any = "";
  constructor(private route:ActivatedRoute , private productService:ProductsService) {
    const id =this.route.snapshot.paramMap.get('id');
    console.log(id);
    console.log(typeof(id));
    
    this.productService.getSingleProduct(id).subscribe(
      (res)=>{
        console.log(res);
        this.item = res[0]
        console.log(this.item);
        
      },
      (err)=>{
        console.log(err);
      }
    )
    
   }

  ngOnInit(): void {
  }


  
  addToCart(id:any){
    console.log(typeof(id));
    this.productService.getSingleProduct(id).subscribe((res)=>{
      console.log(res[0]);
      this.productService.setItems(res[0]);
      this.productService.totalCost(res[0]);
      this.productService.cartNumbers(res[0]);
      this.productService.getCartNumber();
      this.productService.getCartProducts();
    })
  }


  submit(f:NgForm){
    console.log(f.value.pin);
    if(f.value.pin === "732201"){
      this.text = "Available in this pin code"
    }
    
  }
  // addToCart(id:any){
  //   let cartItems:any = localStorage.getItem('cartItem');
  //   cartItems = JSON.parse(cartItems)
  //   if(cartItems){
  //     this.cartItem = [
  //       ...cartItems,
  //       id
  //     ]
  //   }else{
  //     this.cartItem = [
  //       id
  //     ]
  //   }
  //   localStorage.setItem('cartItem' , JSON.stringify(this.cartItem));
  //   console.log(this.pService.getCartItemNumber());
  // }

}
