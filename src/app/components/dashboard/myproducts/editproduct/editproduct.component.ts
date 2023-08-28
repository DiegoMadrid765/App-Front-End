import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin, pipe } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css'],
})
export class EditproductComponent {
  id: number = 0;
  product!: Product;
  constructor(
    private routed: ActivatedRoute,
    private httpproduct: ProductService,
    private router: Router
  ) {
    this.id = routed.snapshot.params['id'];
  }
  ngOnInit() {
    this.getProductEdit();
  }
  async getProductEdit() {
    this.httpproduct
      .SeeEditProduct(this.id)
      .subscribe(
        (data) => {
          this.product = data;
        
        },
        (error) => {
      
          this.router.navigate(['dashboard/myproducts']);
        }
      )
  }


  

}
