import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGUard implements CanActivate {
  constructor(
    private router: Router,
    private cookiesservice: CookieService,
    private httplogin: LoginService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.cookiesservice.get("token")) {
      this.router.navigate(['/welcome/login']);
    }else if(!this.httplogin.userUtenticated()){
      this.cookiesservice.delete('token');
      this.router.navigate(['/welcome/login']);
    }
    return true;
  }
}
