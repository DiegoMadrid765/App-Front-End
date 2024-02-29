import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from 'src/assets/enviroment';
import { Login } from '../models/Login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
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
      `${this.apiurl}${this.endpoint}?email=${email}`,
      requestOptions
    );
  }

  trmconsultar():Observable<any>{
    return this.http.get("https://api.currencyapi.com/v3/latest?apikey=cur_live_ROyQRT5ZnzFNwCw6XxIqg01K5GYdn3kbbmnzY2ca&currencies=COP");
  }


}