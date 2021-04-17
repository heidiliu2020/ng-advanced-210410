import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // !! 只會出現 true/false，避免型別判別出錯
    if (!!localStorage.getItem('token')) {
      return true;
    } else {
      // 假如沒有 token 就直接導向 login
      return this.router.createUrlTree(['/login'], {
        queryParams: {
          returnUrl: state.url
        }
      });
    }
  }

}
