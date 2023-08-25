import { Injectable } from '@angular/core';
import { Variables } from 'src/assets/enviroment';
import { Product, ProductDTO } from '../models/Product';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  endpoint: string = '';
  apiurl: string = Variables.backendroute;
  constructor(private http:HttpClient) { }

  registerprodcut(product:ProductDTO):Observable<any>{
    console.log(product);
    
    const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price.toString());
      formData.append('image', product.image);
      formData.append('stock', product.stock);

    this.endpoint="api/Product/RegisterProduct";


    return this.http.post(`${this.apiurl}${this.endpoint}`,formData);
  }
  getProducts():Observable<Product[]>{
    this.endpoint="api/Product/Getproducts";
    return this.http.get<Product[]>(`${this.apiurl}${this.endpoint}`);
  }
  buyProduct(idproduct:number):Observable<any>{
    this.endpoint="api/Product/BuyProduct";
    const params = new HttpParams().append('idproduct', idproduct);
    const requestOptions = { params: params };
    return this.http.post(`${this.apiurl}${this.endpoint}?idproduct=${idproduct}`,requestOptions);
  }

  getMyProducts():Observable<Product[]>{
    this.endpoint="api/Product/GetMyProducts";
    return this.http.get<Product[]>(`${this.apiurl}${this.endpoint}`);
  }

  setHideProduct(idproduct:number):Observable<any>{
    this.endpoint="api/Product/ShowOrHideProducts";
    const params = new HttpParams().append('idproduct', idproduct);
    const requestOptions = { params: params };
    return this.http.put(`${this.apiurl}${this.endpoint}?idproduct=${idproduct}`,requestOptions);
  }

  GetPurchasesForPdf():Observable<any>{
    this.endpoint="api/Product/GetPurchasesForPdf";
   
    return this.http.get(`${this.apiurl}${this.endpoint}`);
  }

  GetProductDetails(id:number):Observable<Product>{
    this.endpoint=`api/Product/GetProductDetails?id=${id}`;
   
    return this.http.get<Product>(`${this.apiurl}${this.endpoint}`);
  }

  SeeEditProduct(id:number):Observable<Product>{
    this.endpoint=`api/Product/SeeEditProduct?id=${id}`;
   
    return this.http.get<Product>(`${this.apiurl}${this.endpoint}`);
  }
}
