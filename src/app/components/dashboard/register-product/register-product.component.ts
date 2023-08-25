import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductDTO } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css'],
  providers: [MessageService],
})
export class RegisterProductComponent {
  formRegister: FormGroup;
  stocks: any[] = [
    { name: 'INSTOCK' },
    { name: 'LOWSTOCK' },
    { name: 'OUTOFSTOCK' },
  ];
  image!: File;
  constructor(
    private fb: FormBuilder,
    private httpproduct: ProductService,
    private messageService: MessageService,
    private router: Router,
    private title:Title
  ) {
    title.setTitle("Sell");
    this.formRegister = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: ['INSTOCK', Validators.required],
    });
  }
  getImage(event: any) {
    console.log(this.image);

    this.image = event.target.files[0];
  }
  RegisterProduct() {
    if (this.formRegister.invalid) {
      return;
    }
    const product: ProductDTO = {
      name: this.formRegister.value.name,
      description: this.formRegister.value.description,
      price: this.formRegister.value.price,
      image: this.image,
      stock: this.formRegister.value.stock,
      hidden:0
    };
    this.httpproduct.registerprodcut(product).subscribe(
      (data) => {
        this.formRegister.reset();
        this.showMessage(
          'Product Registered',
          'the pruduct has been registered',
          'success'
        );
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 5000);
      },
      (error) => {
        if (error.error.error == 'imagenull') {
          this.showMessage(
            'Image remain',
            'Please, you must upload an iamge to continue',
            'error'
          );
        }else if(error.error.error == 'heavyimage'){
          this.showMessage(
            'Size Image',
            'Please, the weight of the image cannot exceed 5 megabytes',
            'error'
          );
        }
      }
    );
  }
  showMessage(title: string, description: string, logo: string) {
    this.messageService.add({
      severity: logo,
      summary: title,
      detail: description,
    });
  }
}
