import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from 'src/assets/enviroment';
import { Login } from '../models/Login';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  endpoint: string = '';
  apiurl: string = Variables.backendroute;
  constructor(private http: HttpClient) {}

  checkEmail(email: any): Observable<any> {
    const params = new HttpParams().set('email', email.email);

    const requestOptions = { params: params };
    return this.http.get(`${this.apiurl}api/Login/checkEmail`, requestOptions);
  }

  login(login: Login): Observable<any> {
    this.endpoint = 'api/Login/Login';
    return this.http.post(`${this.apiurl}${this.endpoint}`, login);
  }

  getTokenDecode(): any {
    const helper = new JwtHelperService();
    const decodedtoke = helper.decodeToken(localStorage.getItem('token')!);
    return decodedtoke;
  }

  SendEmailResetActivateAccount(email:string): Observable<any>{
    this.endpoint = 'api/Login/SendEmailResetActivateAccount';
    email=email.trim();
    const params=new HttpParams().set("email",email);
    const requestOptions = { params: params };
    return this.http.post(`${this.apiurl}${this.endpoint}?email=${email}`,requestOptions);
  }
}
