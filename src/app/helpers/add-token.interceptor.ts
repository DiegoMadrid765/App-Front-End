import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {
  constructor(private router: Router,private cookiesservice:CookieService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.cookiesservice.get("token");
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        if (error.status === 0 || error.status === 401) {
          this.cookiesservice.delete('token');
          this.router.navigate(['welcome/login']);
          
        }
        return throwError(error);
      })
    );
  }
}
