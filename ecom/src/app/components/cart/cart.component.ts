
import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../service/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public names: String[] = []
  public price: String[] = []
  public cartItems:any;
  public item: any
  public totalMoney: any = 0;
  public items: any
  constructor(public productService: ProductsService) {
    // this.cartItems = this.productService.getCartProducts()
    // console.log(this.cartItems);
    // this.cartItems = this.productService.cartProducts
    // console.log(this.cartItems);
    
  }

  ngOnInit(): void {
    // this.cartItems = this.productService.cartProducts
  }

  


  // removeCart(id: any) {
  //   console.log(id);
  //   console.log(typeof (id));
  //   // let carts = this.productService.getCartItem()
  //   // carts= carts.filter((elem:any)=>elem !== id)
  //   // localStorage.setItem('cartItem' , JSON.stringify(carts))
  //   // this.productService.updateCart();
  //   // console.log(this.getCart());

  //   let carts: any = localStorage.getItem('cartItem')
  //   carts = JSON.parse(carts)
  //   carts = carts.filter((el: any) => el !== id)
  //   console.log(carts);
  //   localStorage.setItem('cartItem', JSON.stringify(carts))
  //   console.log();
  //   this.productService.updateCart()
  // }

  removeItem(title:any){
    console.log(title);
    console.log(typeof(title));
    this.productService.removeItem(title)
    // this.productService.getCartProducts()
  }


}


