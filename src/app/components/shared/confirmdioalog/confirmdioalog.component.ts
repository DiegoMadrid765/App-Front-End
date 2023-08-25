import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirmdioalog',
  templateUrl: './confirmdioalog.component.html',
  styleUrls: ['./confirmdioalog.component.css']
})
export class ConfirmdioalogComponent {
@Input("title") title:string="";
}
