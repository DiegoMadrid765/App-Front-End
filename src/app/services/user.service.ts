import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Variables } from 'src/assets/enviroment';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { Address } from '../models/Address';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endpoint: string = '';
  apiurl: string = Variables.backendroute;
  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    this.endpoint = 'api/User/RegisterUser';
    return this.http.post(`${this.apiurl}${this.endpoint}`,user);
  }

  GetUserData(): Observable<User> {
    this.endpoint = 'api/User/GetUserData';
    return this.http.get<User>(`${this.apiurl}${this.endpoint}`);
  }

  GetActivatedUser(url: string): Observable<any> {
    this.endpoint = 'api/User/GetActivatedUser';
    const params = new HttpParams().set('url', url);
    const requestOptions = { params: params };
    return this.http.get(`${this.apiurl}${this.endpoint}`, requestOptions);
  }

  ActivateUser(id: number): Observable<any> {
    this.endpoint = 'api/User/ActivateUser';
    const params = new HttpParams().append('id', id);
    const requestOptions = { params: params };
    return this.http.put(`${this.apiurl}${this.endpoint}?id=${id}`, requestOptions);
  }

  GetUserdataEdit():Observable<User>{
    this.endpoint = 'api/User/GetUserdataEdit';
    return this.http.get<User>(`${this.apiurl}${this.endpoint}`);
  }
}
