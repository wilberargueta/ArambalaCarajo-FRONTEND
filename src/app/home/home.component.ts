import { UsuarioRoleService } from './../_services/usuario-role.service';
import { UsuarioEmpleadoService } from './../_services/usuario-empleado.service';
import { UsuarioService } from './../_services/usuario.service';
import { LoginParamService } from './../_services/login-param.service';
import { UsuarioEmpleado } from './../_model/usuario-empleado';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../_model/usuario';
import { UsuarioRole } from '../_model/usuario-role';

@Component({
  selector: 'ac-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(
    public sesion: LoginParamService,
    private usuarioService: UsuarioService,
    private usuarioEmpleadoService: UsuarioEmpleadoService,
    private usuarioRoleService: UsuarioRoleService
  ) {}
  ngOnInit() {

  }
}
