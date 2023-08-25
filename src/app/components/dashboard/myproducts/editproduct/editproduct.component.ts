import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.getProductEdit();
  }
  getProductEdit() {
    this.httpproduct.SeeEditProduct(this.id).subscribe(
      (data) => {
        this.product = data;
        console.log(this.product);
        
      },
      (error) => {
        console.log(error);
        this.router.navigate(['dashboard/myproducts']);
      }
    );
  }
}
