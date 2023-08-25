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

  constructor(
    private route: ActivatedRoute,
    private httpuser: UserService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.url = this.route.snapshot.params['url'];

    this.httpuser.GetActivatedUser(this.url).subscribe((data) => {
      if (data == null) {
        this.router.navigate(['/']);
      } else {
       
        
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
