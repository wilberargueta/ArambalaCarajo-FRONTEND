import { Router } from '@angular/router';
import { UsuarioRole } from './_model/usuario-role';
import { UsuarioEmpleado } from './_model/usuario-empleado';
import { Usuario } from './_model/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioRoleService } from './_services/usuario-role.service';
import { UsuarioEmpleadoService } from './_services/usuario-empleado.service';
import { UsuarioService } from './_services/usuario.service';
import { LoginParamService } from './_services/login-param.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoginParamService]
})
export class AppComponent implements OnInit, DoCheck {
  constructor(private router: Router) {}
  session = true;
  nombreUsuario = null;
  helper = new JwtHelperService();
  ngOnInit() {
    this.router.navigate(['home']);
  }
  ngDoCheck() {
    if (sessionStorage.getItem('token') !== null) {
      this.session = true;
    } else {
      this.session = false;
    }
  }
}
