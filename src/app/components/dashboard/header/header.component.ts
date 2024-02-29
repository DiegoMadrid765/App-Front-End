import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem, MessageService } from 'primeng/api';
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
    private messageService: MessageService,
    private cookiesservice: CookieService
  ) {
    this.items = [
      {
        label: 'Account',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Edit account',
            icon: 'pi pi-user-edit',
            routerLink: 'edituser',
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
        label: 'Download purchases history',
        icon: 'pi pi-fw pi-download',
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
    this.cookiesservice.delete('token');
    this.router.navigate(['/welcome/login']);
  }

  GetPurchasesForPdf(): void {
    const cuerrentDate: Date = new Date();
    this.httpproduct.DownloadPDFPurchases().subscribe(
      (data: any) => {
      

        const blob = new Blob([data], { type: 'application/pdf' });
  

        saveAs(
          blob,
          `Purchases ${cuerrentDate.getDate()}-${
            cuerrentDate.getMonth() + 1
          }-${cuerrentDate.getFullYear()}`
        );
      },
      (error) => {
        console.log('error');
      }
    );
  }

  showMessage(title: string, description: string, logo: string): void {
    this.messageService.add({
      severity: logo,
      summary: title,
      detail: description,
    });
  }
}
