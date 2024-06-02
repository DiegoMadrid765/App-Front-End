import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css'],
})
export class ActivateComponent implements OnInit {
  url: string = '';
  showActivatedMesage:boolean=false;
  wrongurl:boolean=false;
  erroLink:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private httpuser: UserService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {

    
  }
  ngOnInit(): void {
    this.url = this.route.snapshot.params['url'];

    this.httpuser.GetActivatedUser(this.url).subscribe((data) => {
      if (data == null) {
        //this.router.navigate(['/']);
        this.showActivatedMesage=true;
        this.wrongurl=true;
      } else {
       
        this.showActivatedMesage=true;
        
        const id = data.id;
        
          this.activateUser(id);
       
        
      }
    });
  }

  Message() {
    this.confirmationService.confirm({
      message: 'Your account has been activated',
      icon: 'pi pi-check',

      accept: () => {
        this.router.navigate(['/']);
      },
    });
  }
  activateUser(id: number) {
    this.httpuser.ActivateUser(id).subscribe((data) => {
      this.Message();
    });
  }
}
