import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Login } from 'src/app/models/Login';
import { LoginService } from 'src/app/services/login.service';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  FormLogin: FormGroup;
  loading: boolean = false;
  constructor(
    private primengConfig: PrimeNGConfig,
    private title: Title,
    private dialogService: DialogService,
    private httplogin: LoginService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private cookieservice: CookieService
  ) {
    title.setTitle('Login');
    this.FormLogin = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.title.setTitle('Login');

  }

  LoginIn() {
    if (this.FormLogin.valid) {
      this.loading = true;
      const login: Login = new Login(
        this.FormLogin.value.email,
        this.FormLogin.value.password
      );
      this.httplogin.login(login).subscribe(
        (data) => {


          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getFullYear() + 1);

          this.cookieservice.set('token', data.token, expirationDate);

          this.FormLogin.reset();
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.loading = false;
          if (error.error.message == 'User doesnt exist') {
            this.showMessage(
              'The user does not exist',
              'The E-mail you entered does not exist',
              'error'
            );
          } else if (error.error.message == 'Password incorrect') {
            this.showMessage(
              'Password incorrect',
              'The Password you entered is incorrect',
              'error'
            );
          } else if (error.error.message == 'notActivated') {
            this.SendEmailActivate();
          }
        }
      );
    }
  }

  showMessage(title: string, description: string, logo: string) {
    this.messageService.add({
      severity: logo,
      summary: title,
      detail: description,
    });
  }

  SendEmailActivate() {
    this.confirmationService.confirm({
      message: `Your account is not activated, if you have forgot your creadentials press "Ok" to send an email to ${this.FormLogin.value.email} to recover it`,
      icon: 'pi pi-times',

      accept: () => {
        this.httplogin
          .SendEmailResetActivateAccount(this.FormLogin.value.email)
          .subscribe(
            (data) => {
              this.showMessage(
                'Email sent',
                `The email has been sent to ${this.FormLogin.value.email}`,
                'success'
              );
            },
            (error) => {
              this.showMessage(
                'Email not sent',
                `could not been sent`,
                'error'
              );
            }
          );
      },
    });
  }

  showRestePasswordModal() {
    this.dialogService.open(ForgetPasswordComponent, {
      header: "Reset your password",
      width:"45%"
      })
  }
}
