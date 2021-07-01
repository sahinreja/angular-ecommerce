import { ProductsService } from './../../service/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  address:any;
  order_id:any;
  order_product:any;
  totalPrice:any
  length:any;
  constructor(private productService:ProductsService) {
    this.productService.getLastOrder().subscribe((res)=>{
      console.log(res[0]);
      this.order_id  = res[0]._id
      this.order_product = res[0].products
      this.address = res[0].address
      this.totalPrice = res[0].totalCost
      this.length = res[0].products.length
    } , (err)=>{
      console.log(err);
    })
   }

  ngOnInit(): void {
  }

}
