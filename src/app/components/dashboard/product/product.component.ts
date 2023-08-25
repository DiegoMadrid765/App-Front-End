import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit{
  productid:number=0;
  product!:Product;
  constructor(private route: ActivatedRoute,private httpproduct:ProductService,private router:Router) {

   
  }
  ngOnInit(){
      
  this.productid=this.route.snapshot.params["id"];
   console.log(this.productid);
  this.httpproduct.GetProductDetails(this.productid).subscribe(data=>{
    console.log(data);
    this.product=data;
  },error=>{
    this.router.navigate([""]);
  })
  }
}
