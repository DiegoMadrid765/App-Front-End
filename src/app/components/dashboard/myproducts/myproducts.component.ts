import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent {
  products: Product[] = [];
  loaded=false;
  
  constructor(private httpproduct:ProductService,private title:Title,private router:Router) {
  title.setTitle("My products");
    this.getMyproducts();
  }


  getMyproducts(){
    this.httpproduct.getMyProducts().subscribe(data=>{
      this.products=data;
      console.log(this.products);
      
      this.loaded=true;
    },error=>{

      this.loaded=true;
    })
  }
  setHideProduct(idproduct:number){
this.httpproduct.setHideProduct(idproduct).subscribe(data=>{
this.getMyproducts();
})
  }

  GoProduct(id:number){   
  
this.router.navigate(["dashboard/myproducts/myproduct",id]);
  }


}
