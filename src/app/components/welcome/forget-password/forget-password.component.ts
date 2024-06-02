import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
  providers: [MessageService]
})
export class ForgetPasswordComponent {
  messages: Message[] | undefined;
  sendingEmail:boolean=false;
  formResetPassword: FormGroup;
  constructor(private fb: FormBuilder, private loginService: LoginService, private messageService: MessageService,) {
    this.formResetPassword = fb.group({
      email: ["", [Validators.required, Validators.email]]
    })

  }
  SendResetPasswordEmail() {
    this.sendingEmail=true;
    if (this.formResetPassword.invalid) return;
    const email = this.formResetPassword.get("email")?.value.trim();
    this.loginService.SendEmailForgetPassword(email).subscribe(data => {
  
      const { title, description, type } = data;
      this.sendingEmail=false;
      this.showMessage(title, description, type);
    }
      , error => {
        console.log(error);
        const { title, description, type } = error.error;
        this.sendingEmail=false;
        this.showMessage(title, description, type);

      }
    )
  }
  showMessage(title: string, description: string, logo: string) {
    this.messageService.clear();
    this.messageService.add({
      severity: logo,
      summary: title,
      detail: description,
      life: 3000
    });
  }
}
