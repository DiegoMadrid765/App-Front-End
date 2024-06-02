import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [MessageService],
})
export class MainComponent implements OnInit {
  products: Product[] = [];
  UserData!: User;
  loaded = false;
  constructor(
    private httpuser: UserService,
    private httpproduct: ProductService,
    private messageService: MessageService,
    private router: Router,
    private title: Title,
    private dialogService: DialogService
    
  ) {
    title.setTitle('Main');
  }

  ngOnInit(): void {
    this.httpuser.GetUserData().subscribe(
      (data) => {
        this.UserData = data;
      },
      (error) => {

        this.router.navigate(['welcome/login']);
      }
    );
    this.httpproduct.getProducts().subscribe(
      (data) => {
        this.products = data;
        console.log(this.products);
        
        this.loaded = true;
      },
      (error) => {
        this.loaded = true;
      }
    );
  }
  getSeverity(product: string) {
    switch (product) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  }

  buyProduct(idproduct: number) {
    this.httpproduct.buyProduct(idproduct).subscribe(
      (data) => {
        this.showMessage(
          'successful purchase',
          'Your purchase has made successfully',
          'success'
        );
      },
      (error) => {
        this.showMessage('Error', 'An error has happened', 'error');
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

  GoProduct(url: string) {    
    this.router.navigate(['dashboard/product', url]);
  }

  openModal(){
    this.dialogService.open(HeaderComponent,{
      header:"open",
      dismissableMask:false,
      
    })
  }
}
