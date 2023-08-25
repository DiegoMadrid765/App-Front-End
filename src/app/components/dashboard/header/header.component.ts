import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { User } from 'src/app/models/User';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(
    private router: Router,
    private httpproduct: ProductService,
    private messageService: MessageService
  ) {
    this.items = [
      {
        label: 'Account',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Edit account',
            icon: 'pi pi-user-edit',
          },

          {
            label: 'Logout',
            icon: 'pi pi-fw pi-sign-out',
            command: () => {
              this.logOut();
            },
          },
        ],
      },
      {
        label: 'Sell',
        icon: 'pi pi-fw pi-dollar',
        routerLink: 'sell',
      },
      {
        label: 'Purchases',
        icon: 'pi pi-fw pi-gift',
        command: () => {
          this.GetPurchasesForPdf();
        },
      },
      {
        label: 'My products',
        icon: 'pi pi-shopping-bag',
        routerLink: 'myproducts',
      },
    ];
  }
  ngOnInit(): void {}
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/welcome/login']);
  }

  GetPurchasesForPdf() {
    this.httpproduct.GetPurchasesForPdf().subscribe(
      (data) => {
        console.log(data);
        
        this.showMessage(
          'Purchases sent',
          'Check your Email with all purchases you have made so far.',
          'success'
        );
      },
      (error) => {
        this.showMessage('Error', 'An strange error has happened', 'error');
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
