import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem, MessageService } from 'primeng/api';
import { User } from 'src/app/models/User';
import { PdfService } from 'src/app/services/pdf.service';
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
    private cookiesservice: CookieService,
    private httppdf:PdfService
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
    //localStorage.removeItem('token');
    console.log(this.cookiesservice.get('token'));

    this.router.navigate(['/welcome/login']);
    //this.cookiesservice.delete('token');
    localStorage.removeItem("token")
  }

  GetPurchasesForPdf() {
    this.httppdf.downloadPdf().subscribe(
      (data: any) => {
        console.log(data);
        
        const blob = new Blob([data], { type: 'application/pdf' });
        saveAs(blob, 'generated.pdf');
      },
      (error) => {
        console.log('error');
      }
    );
    /*this.httpproduct.GetPurchasesForPdf().subscribe(
      (data) => {
        this.showMessage(
          'Purchases sent',
          'Check your Email with all purchases you have made so far.',
          'success'
        );
      },
      (error) => {
        this.showMessage('Error', 'An strange error has happened', 'error');
      }
    );*/
  }

  showMessage(title: string, description: string, logo: string) {
    this.messageService.add({
      severity: logo,
      summary: title,
      detail: description,
    });
  }
}
