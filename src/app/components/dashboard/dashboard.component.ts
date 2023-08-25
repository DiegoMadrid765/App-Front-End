import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
 
  Token: string = '';
  constructor(private httpuser: UserService, private httplogin: LoginService,private title:Title) {
    title.setTitle("Main");
    
  }
  ngOnInit(): void {
    

   
  }
}
