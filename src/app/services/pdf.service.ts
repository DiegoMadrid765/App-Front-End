import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from 'src/assets/enviroment';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  apiurl: string = Variables.backendroute;
  endpoint: string;
  constructor(private http: HttpClient) {
    this.endpoint = '';
  }

  downloadPdf(): Observable<any> {
    this.endpoint = 'api/pdf/DownloadPDF';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiurl}${this.endpoint}`, {
      headers,
      responseType: 'arraybuffer',
    });
  }
}
