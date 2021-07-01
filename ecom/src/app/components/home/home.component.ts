import { ProductsService } from './../../service/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products:any;



  constructor(private productService:ProductsService) {

    this.productService.getAllProducts().subscribe((res)=>{
      console.log(res);
      this.products = res.homeProducts
    })

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
  //   console.log(this.productService.getCartItemNumber());
  // }

}
