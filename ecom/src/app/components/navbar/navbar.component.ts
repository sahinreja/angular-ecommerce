import { ProductsService } from './../../service/products.service';
import { UserAuthService } from './../../service/user-auth.service';
import { AuthGuardGuard } from './../../guard/auth-guard.guard';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public cartNumber:any;
  showFiller = false;
  constructor(public authGuard:AuthGuardGuard 
    ,public authUser:UserAuthService,public productService:ProductsService ) {  
    //  this.cartNumber = this.productService.getCartNumber()
      
  }

  ngOnInit(): void {
  }

  open(){
    console.log('running');
  }


}
