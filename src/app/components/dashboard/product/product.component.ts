import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { StringServiceService } from 'src/app/services/string-service.service';
import { Location } from '@angular/common';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productid: number = 0;
  product!: Product;
  items!: MenuItem[];
  imageDonlaed: any;
  constructor(
    private location: Location,
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
    this.items = [
      {
        icon: 'pi pi-qrcode',
        command: () => {
          this.DownloadPurchaseQr();
        },

        tooltipOptions: {
          tooltipLabel: 'Download product QR link',
          positionTop: -5,
          tooltipPosition: 'top',
        },
      },
      {
        icon: 'pi pi-copy',
        command: () => {
          this.getCurrentUrl();
        },
        tooltipOptions: {
          tooltipLabel: 'Copy product link',
          positionTop: -5,
          tooltipPosition: 'top',
        },
      },
    ];
  }

  getCurrentUrl() {
    const currentUrl = window.location.href;
    const textField = document.createElement('textarea');
    textField.innerText = currentUrl;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    document.body.removeChild(textField);
  }
  DownloadPurchaseQr() {
    this.httpproduct
      .DownloadPurchaseQr(window.location.href)
      .subscribe((image: Blob) => {
        console.log(image);
        saveAs(image, 'foto');
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imageDonlaed = reader.result;
        };
        reader.readAsDataURL(image);
      });
  }
}
