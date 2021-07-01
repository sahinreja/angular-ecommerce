import { Router } from '@angular/router';
import { Injectable, TRANSLATIONS } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public cartItem: any
  public cart: any;
  constructor(private _http: HttpClient , public router:Router) { }

  getAllProducts() {
    return this._http.get<any>('http://localhost:3000/api/products');
  }

  getSingleProduct(id: any) {
    return this._http.get<any>(`http://localhost:3000/api/products/${id}`)
  }

  // addToCart(id:any){
  //   this.cartItem = localStorage.getItem('cartItem');
  //   if(this.cartItem.length !== null){
  //     this.cartItem = [
  //       ...this.cartItem,
  //       id
  //     ]
  //   }else{
  //     this.cartItem = [
  //       id
  //     ]
  //   }
  //   localStorage.setItem('cartItem' , JSON.stringify(this.cartItem));
  // }

  // getCartItemNumber(){
  //   let cart:any = localStorage.getItem('cartItem')
  //   cart = JSON.parse(cart);
  //   return cart.length
  // }

  // getCartItem(){
  //   this.cart = localStorage.getItem('cartItem');
  //   this.cart = JSON.parse(this.cart)
  //   return this.cart;
  // }

  // updateCart(){
  //   let cart:any = localStorage.getItem('cartItem');
  //   return JSON.parse(cart)
  // }

  cartNumbers(product: any) {
    let productNumber: any = localStorage.getItem('cartNumbers')
    productNumber = parseInt(productNumber);

    if (productNumber) {
      localStorage.setItem('cartNumbers', productNumber + 1);
    } else {
      localStorage.setItem('cartNumbers', JSON.stringify(1));
    }
  }
  public cartProducts:any[] = [] 
  getCartNumber() {
    let cart: any = localStorage.getItem('cartNumbers');
    return cart;
  }

  getCartProducts() {
    let cartProducts: any = localStorage.getItem('productsInCart');
    cartProducts = JSON.parse(cartProducts)
    console.log(Object.values(cartProducts));
    this.cartProducts = Object.values(cartProducts);
  }


  getTotalPrice(){
    let cost:any = localStorage.getItem('totalCost')
    cost =  JSON.parse(cost)
    return cost;
  }




  setItems(product: any) {
    let cartItems: any = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
      if(cartItems[product.title] == undefined){
        cartItems = {
          ...cartItems,
          [product.title] : product
        }
      }
      cartItems[product.title].inCart += 1
    }else{
      product.inCart = 1;
      cartItems = {
        [product.title]:product
      }
    }
   
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
  }

  totalCost(product: any) {
    let cartCost: any = localStorage.getItem('totalCost');
    if (cartCost != null) {
      cartCost = parseInt(cartCost);
      localStorage.setItem('totalCost', cartCost + product.price)
    } else {
      localStorage.setItem('totalCost', product.price);
    }
  }


  removeItem(title:any){
    let cart:any = localStorage.getItem('productsInCart');
    let totalCost:any = localStorage.getItem('totalCost');
    let cartNumbers:any = localStorage.getItem('cartNumbers');
    cart = JSON.parse(cart)
    totalCost = JSON.parse(totalCost)
    cartNumbers = JSON.parse(cartNumbers)
    console.log(typeof(cartNumbers));
    
    let removeItemPrice = Object.values<any>(cart).find((item:any)=>item.title === title).price;
    let removeItemNumber = Object.values<any>(cart).find((item:any)=>item.title === title).inCart;
    console.log(removeItemNumber);
    console.log(typeof(removeItemPrice));
    
    if(cartNumbers == 1){
      cartNumbers -= removeItemNumber;
      totalCost -= removeItemPrice 
    }else{
      cartNumbers -= removeItemNumber;
      totalCost -= removeItemNumber * removeItemPrice
    }
    if(cartNumbers == 0){
      localStorage.removeItem('productsInCart')
    }
    if(cartNumbers == 0){
      localStorage.removeItem('cartNumbers')
    }
    if(totalCost == 0){
      localStorage.removeItem('totalCost')
      return;
    }
    console.log(Object.keys(cart));
    let newCartKey = Object.keys(cart).filter((elem:any)=>elem != title)
    console.log(newCartKey);
    let newCartValues = Object.values(cart).filter((element:any)=>element.title != title)
    console.log(newCartValues);
    let carts:any
    newCartKey.forEach((key:any)=>{
      console.log(key);
      newCartValues.forEach((elem:any)=>{
        if(elem.title == key){
          carts = {
            ...carts,
            [key] : elem
          }
        }
      }) 
    })
    console.log(carts);
    localStorage.setItem('productsInCart', JSON.stringify(carts))
    localStorage.setItem('totalCost', JSON.stringify(totalCost))
    localStorage.setItem('cartNumbers', JSON.stringify(cartNumbers))
    this.getCartProducts();
    console.log(this.getCartProducts());
    
  }


  increment(title:any){
    let cart:any = localStorage.getItem('productsInCart');
    let cartNumbers:any = localStorage.getItem('cartNumbers');
    let totalCost:any = localStorage.getItem('totalCost');
    cart = JSON.parse(cart);
    cartNumbers = JSON.parse(cartNumbers);
    totalCost = JSON.parse(totalCost);
    let incPrice = Object.values<any>(cart).find((item:any)=>item.title == title).price;
    let inCart = Object.values<any>(cart).find((item:any)=>item.title == title).inCart;

    totalCost+=incPrice;
    cartNumbers+=1;
    inCart+=1
    if(inCart <=5){
      Object.values<any>(cart).find((item:any)=>item.title == title).inCart = inCart;
      localStorage.setItem('productsInCart' , JSON.stringify(cart))
      localStorage.setItem('totalCost' , JSON.stringify(totalCost))
      localStorage.setItem('cartNumbers' , JSON.stringify(cartNumbers))
      this.getCartProducts()
    }
  }

  dcrement(title:any){
    let cart:any = localStorage.getItem('productsInCart');
    let cartNumbers:any = localStorage.getItem('cartNumbers');
    let totalCost:any = localStorage.getItem('totalCost');
    cart = JSON.parse(cart);
    cartNumbers = JSON.parse(cartNumbers);
    totalCost = JSON.parse(totalCost);
    let incPrice = Object.values<any>(cart).find((item:any)=>item.title == title).price;
    let inCart = Object.values<any>(cart).find((item:any)=>item.title == title).inCart;

    totalCost-=incPrice;
    cartNumbers-=1;
    inCart-=1
    if(inCart >= 1){
      Object.values<any>(cart).find((item:any)=>item.title == title).inCart = inCart;
      localStorage.setItem('productsInCart' , JSON.stringify(cart))
      localStorage.setItem('totalCost' , JSON.stringify(totalCost))
      localStorage.setItem('cartNumbers' , JSON.stringify(cartNumbers))
      this.getCartProducts()
    }
  }

  getAddress(userId:any){
    return this._http.get<any>(`http://localhost:3000/api/address/${userId}`)
  }
  postAddress(userId:any , userData:any){
    return this._http.post<any>(`http://localhost:3000/api/address/${userId}` , userData);
  }

  // checkAddress(){
  //   return this._http.get()
  // }
  private user_id:any
  public address:any
  getTotalAddress(){
    this.user_id = localStorage.getItem('user_id');
    this.getAddress(this.user_id).subscribe((res)=>{
      console.log('from service',res);
      this.address = res      
    } , (err)=>{
      console.log(err);
    })
  }
  deleteAddress(id:any){
    return this._http.delete<any>(`http://localhost:3000/api/delete/${id}`);
  }
  checkAddress(){
    let user_id:any = localStorage.getItem('user_id');
    this.router.navigate([`/address/${user_id}`])
    // console.log(typeof(user_id));
  }

  // getUserId(){
  //   let user_id:any = localStorage.getItem('user_id');
  //   return user_id;
  // }

  postProducts(userData:any){
    return this._http.post<any>('http://localhost:3000/api/products' , userData)
  }

  getLastOrder(){
    let orderId:any = localStorage.getItem('order_id');
    orderId = JSON.parse(orderId)
    return this._http.get<any>(`http://localhost:3000/api/lastOrdered/${orderId}`)
  }

  updateUser(userData:any){
    let user_id:any = localStorage.getItem('user_id');
    return this._http.put(`http://localhost:3000/api/user-update/${user_id}`, userData)
  }



  checkOut(address:any){

    let user_id:any = localStorage.getItem('user_id');
    console.log(user_id);
    
    let products:any = localStorage.getItem('productsInCart')
    products = JSON.parse(products)
    products = Object.values(products);
    console.log(products);
    

    let totalCost:any = localStorage.getItem('totalCost');
    totalCost = JSON.parse(totalCost);
    console.log(totalCost);
    
    

    let totalProductNumber:any = localStorage.getItem('cartNumbers')
    totalProductNumber = JSON.parse(totalProductNumber)
    console.log(totalProductNumber);

    let userData:any = {
      user_id:user_id,
      products:products,
      totalCost:totalCost,
      totalProductNumber:totalProductNumber,
      address:address
    }

    console.log(userData);
    
    this.postProducts(userData).subscribe((res)=>{
      console.log(res);
      localStorage.setItem('order_id' , JSON.stringify(res.result._id));
      if(res.message == 'success'){
        localStorage.removeItem('productsInCart');
        localStorage.removeItem('totalCost');
        localStorage.removeItem('cartNumbers');
        this.router.navigate(['/order-summary'])
      }
    } , (err)=>{
      console.log(err);
    })
    
  }
  

  getUserProfile(){
    let user_id:any = localStorage.getItem('user_id')
    // user_id  = JSON.parse(user_id)
    console.log(user_id);
    console.log(typeof(user_id));
    return this._http.get<any>(`http://localhost:3000/api/user-profile/${user_id}`)
  }

  public user:any;
  getUser(){
    this.getUserProfile().subscribe((res)=>{
      this.user = res
    } , (err)=>{
      console.log(err);
    })
  }

  getTotalOrderedProducts(){
    let user_id:any = localStorage.getItem('user_id')
    // user_id  = JSON.parse(user_id)
    console.log(user_id);
    return this._http.get<any>(`http://localhost:3000/api/orderedProducts/${user_id}`);
  }


  filterCategory(data:any){
    return this._http.get<any>(`http://localhost:3000/api/filterCategory/${data}`)
  }


  filterWithPrice(price:any){
    return this._http.get<any>(`http://localhost:3000/api/filterWithPrice/${price}`)
  }

  addProfile(image:File){
    let user_id:any = localStorage.getItem('user_id');
    const profileData = new FormData()
    profileData.append("image" , image);
    this._http.put<any>(`http://localhost:3000/api/user-image/${user_id}` , profileData).subscribe((res)=>{
      console.log(res);
    })
  }




}

