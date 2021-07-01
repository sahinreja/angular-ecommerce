import { ProductsService } from './../../service/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {
  orderedProducts:any;
  
  constructor(private productsService:ProductsService) { 
    
    this.productsService.getTotalOrderedProducts().subscribe((res)=>{
      console.log(res);
      this.orderedProducts = res;
    } , (err)=>{
      console.log(err);
    })
  }

  columnDefs = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price'}
];

rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
];


  ngOnInit(): void {
  }

}
