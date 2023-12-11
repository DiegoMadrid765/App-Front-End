import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
/**
 *
 */
constructor(private httpuser:UserService) {

  
  this.GetUserdataEdit();
}

GetUserdataEdit(){
  this.httpuser.GetUserdataEdit().subscribe(data=>{
    console.log(data);
    
  },error=>{
    console.log(error);
    
  })
}


textToCopy = 'Texto que deseas copiar';

copyToClipboard() {
  const textField = document.createElement('textarea');
  textField.innerText = this.textToCopy;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  document.body.removeChild(textField);
}


}
