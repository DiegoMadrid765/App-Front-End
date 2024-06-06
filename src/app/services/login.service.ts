import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from 'src/assets/enviroment';
import { Login } from '../models/Login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { ResetPasswordDTO } from '../models/DTO/ResetPasswordDTO';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  endpoint: string = '';
  apiurl: string = Variables.backendroute;
  constructor(
    private http: HttpClient,
    private cookiesservice: CookieService
  ) { }

  checkEmail(email: any): Observable<any> {
    const params = new HttpParams().set('email', email.email);

    const requestOptions = { params: params };
    return this.http.get(`${this.apiurl}api/Login/checkEmail`, requestOptions);
  }

  login(login: Login): Observable<any> {
    this.endpoint = 'api/Login/Login';
    return this.http.post(`${this.apiurl}${this.endpoint}`, login);
  }

  userUtenticated(): boolean {
    try {
      const helper = new JwtHelperService();
      helper.decodeToken(this.cookiesservice.get('token')!);
      return true;
    } catch (error) {
      return false;
    }
  }

  SendEmailResetActivateAccount(email: string): Observable<any> {
    this.endpoint = 'api/Login/SendEmailResetActivateAccount';
    email = email.trim();
    const params = new HttpParams().set('email', email);
    const requestOptions = { params: params };
    return this.http.post(
      `${this.apiurl}${this.endpoint}`,
      {params}
    );
  }


  
SendEmailForgetPassword(email:string):Observable<any>{
  this.endpoint="api/Login/sendemailresetpassword"
  const params=new HttpParams().set("email",email)
return this.http.get(`${this.apiurl}${this.endpoint}`,{params})
}

getResetPassword(url:string):Observable<any>{
  this.endpoint="api/Login/getresetpassword"
  const params=new HttpParams().set("url",url)
return this.http.get(`${this.apiurl}${this.endpoint}`,{params})
}

resetPassword(resetPassword:ResetPasswordDTO):Observable<any>{
  this.endpoint="api/Login/resetpassword"
 
return this.http.put(`${this.apiurl}${this.endpoint}`,resetPassword)
}

deleteResetPassword(url:string):Observable<any>{
  this.endpoint="api/Login/deleteresetpassword"
  const params=new HttpParams().set("url",url)
return this.http.delete(`${this.apiurl}${this.endpoint}`,{params})
}

}