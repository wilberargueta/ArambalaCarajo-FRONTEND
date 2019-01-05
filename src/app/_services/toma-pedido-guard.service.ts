import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginParamService } from './login-param.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TomaPedidoGuardService implements CanActivate {
  constructor(private router: Router, private parametros: LoginParamService) {}
  // private resp: boolean;
  private helper = new JwtHelperService();
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage.getItem('token') === null) {
      this.parametros.sessionActiva = false;
      this.router.navigate(['login']);
      return false;
    } else if (this.helper.isTokenExpired(sessionStorage.getItem('token'))) {
      this.router.navigate(['login']);
      this.parametros.sessionActiva = false;
      return false;
    } else if (
      '[Toma Pedido]' !==
      this.helper.decodeToken(sessionStorage.getItem('token')).role
    ) {
      this.parametros.sessionActiva = false;
      this.router.navigate(['home']);
      return false;
    } else {
      this.parametros.sessionActiva = true;
      return true;
    }
  }
}
