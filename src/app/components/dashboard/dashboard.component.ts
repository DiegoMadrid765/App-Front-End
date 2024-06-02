import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/models/User';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
 
  Token: string = '';
  constructor(private title:Title) {
    title.setTitle("Main");
    
  }
  ngOnInit(): void {
    

   
  }
}
