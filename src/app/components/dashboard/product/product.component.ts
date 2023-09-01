import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { StringServiceService } from 'src/app/services/string-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productid: number = 0;
  product!: Product;
  constructor(
    private route: ActivatedRoute,
    private httpproduct: ProductService,
    private router: Router,
    private title: Title,
    private stringservice: StringServiceService
  ) {}
  ngOnInit() {
    this.productid = this.route.snapshot.params['id'];

    this.httpproduct.GetProductDetails(this.productid).subscribe(
      (data) => {
        this.product = data;
        this.title.setTitle(
          `Product - ${this.stringservice.textFirstletterupper(
            this.product.name
          )} `
        );
      },
      () => {
        this.router.navigate(['/']);
      }
    );
  }
}
