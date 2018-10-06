import { LoginParamService } from './../_services/login-param.service';
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
  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private parametros: LoginParamService
  ) {}
  helper = new JwtHelperService();
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `${sessionStorage.getItem('token')}`
      }
    });
    return next.handle(request);
  }
}
