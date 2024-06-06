import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ResetPasswordDTO } from 'src/app/models/DTO/ResetPasswordDTO';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [MessageService]
})
export class ResetPasswordComponent {
  loading: boolean = true;
  wrongUrl: boolean = false;
  sendingResetPassword = false;
  url: string;
  userId: number = 0;
  resetPasswordForm: FormGroup;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private loginService: LoginService, private messageService: MessageService,private router:Router) {

    this.url = route.snapshot.params["url"];

    this.resetPasswordForm = fb.group({
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", Validators.required]
    },
      {
        validators: [this.checkPassword]
      } as AbstractControlOptions
    )
  }

  ngOnInit(): void {
    this.getResetPassword();

  }


  ngOnDestroy(): void {
    if(!this.wrongUrl){
      this.loginService.deleteResetPassword(this.url).subscribe(data=>{

      },error=>{
        
      })
    }

  }
  checkPassword(group: FormGroup): any {
    const password1 = group.controls['password'].value;
    const password2 = group.controls['confirmPassword'].value;
    return password1 === password2 ? null : { notSame: true };
  }

  resetPassword() {
    if (this.resetPasswordForm.invalid) return;
    this.sendingResetPassword = true;
    const password = this.resetPasswordForm.get("password")?.value;
    const confirmPassword = this.resetPasswordForm.get("confirmPassword")?.value;

    const resetPassword = new ResetPasswordDTO(this.url, password, confirmPassword);
    console.log(resetPassword);

    this.loginService.resetPassword(resetPassword).subscribe(data => {

      const { title, description, type } = data;

      this.showMessage(title, description, type);
      setTimeout(() => {
        this.router.navigate(["login"]);
      }, 6000);
    }, error => {
      this.sendingResetPassword = false;
      const { title, description, type } = error.error;
      this.showMessage(title, description, type);
    }
    )
  }

  getResetPassword() {

    this.loginService.getResetPassword(this.url).subscribe(data => {
      this.loading = false;
      console.log(data);

    }, error => {
      this.loading = false;
      this.wrongUrl = true;
    })
  }


  showMessage(title: string, description: string, logo: string) {
    this.messageService.clear();
    this.messageService.add({
      severity: logo,
      summary: title,
      detail: description,
      life: 5000
    });
  }



}
