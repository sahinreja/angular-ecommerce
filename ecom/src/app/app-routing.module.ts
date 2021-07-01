import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DealsComponent } from './components/deals/deals.component';
import { SummaryComponent } from './components/summary/summary.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AddressComponent } from './components/address/address.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  {
    // http://localhost:4200
    path:"",component:HomeComponent
  },
  {
    // http://localhost:4200/products
    path:"products",component:ProductsComponent
  },
  {
    // http://localhost:4200/signup
    path:"signup",component:SignupComponent
  },{
    path:"login",component:LoginComponent
  },{
    path:"cart",component:CartComponent , canActivate:[AuthGuardGuard]
  },
  {
    path:"wish-list",component:WishListComponent , canActivate:[AuthGuardGuard]
  }
  ,{
    // http://localhost:4200/product-details/
    path:"product-details/:id",component:ProductDetailsComponent
  },
  {
    path:"address/:id" , component:AddressComponent , canActivate:[AuthGuardGuard]
  },
  {
    path:"user-profile" , component:UserProfileComponent , canActivate:[AuthGuardGuard]
  },
  {
    path:"order-summary" , component:SummaryComponent , canActivate:[AuthGuardGuard]
  },
  {
    path:"deals" , component:DealsComponent , canActivate:[AuthGuardGuard]
  },
  {
    path:"contact-us" , component:ContactUsComponent , canActivate:[AuthGuardGuard]
  },
  {
    path:"**" , redirectTo:""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
