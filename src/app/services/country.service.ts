import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from 'src/assets/enviroment';
import { Country } from '../models/Country';
import { City } from '../models/City';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  apiurl: string = Variables.backendroute;
  endpoint: string = '';
  constructor(private http:HttpClient) {


   }

   getCountries():Observable<Country[]>{
this.endpoint="api/Country/getCountries";
return this.http.get<Country[]>(`${this.apiurl}${this.endpoint}`);
   }
   getCitiesByCodeandName(code:string,name:string):Observable<City[]>{
    this.endpoint=`api/Country/getCitiesByCodeAndName?code=${code}&name=${name}`;
    return this.http.get<City[]>(`${this.apiurl}${this.endpoint}`);
   }

   getCitiesByCode(code:string):Observable<City[]>{
    this.endpoint=`api/Country/getCitiesByCode?code=${code}`;
    return this.http.get<City[]>(`${this.apiurl}${this.endpoint}`);
   }
}
