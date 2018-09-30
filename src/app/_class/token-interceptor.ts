import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private rout: ActivatedRoute, private router: Router) {}
  helper = new JwtHelperService();
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem('token') === null) {
      request = request.clone({
        setHeaders: {}
      });
      this.router.navigate(['/login'], { relativeTo: this.rout });
      return next.handle(request);
    } else if (this.helper.isTokenExpired(sessionStorage.getItem('token'))) {
      request = request.clone({
        setHeaders: {}
      });

      this.router.navigate(['/login'], { relativeTo: this.rout });
      return next.handle(request);
    }
    request = request.clone({
      setHeaders: {
        Authorization: `${sessionStorage.getItem('token')}`
      }
    });
    return next.handle(request);
  }
}
