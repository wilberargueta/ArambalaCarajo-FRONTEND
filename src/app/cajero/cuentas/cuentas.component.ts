import { CuentaService } from './../../_services/cuenta.service';
import { Usuario } from './../../_model/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Cuenta } from './../../_model/cuenta';
import { CuentaUsuarioService } from './../../_services/cuenta-usuario.service';
import { UsuarioService } from './../../_services/usuario.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CuentaUsuario } from '../../_model/cuenta-usuario';
import * as moment from 'moment';

@Component({
  selector: 'ac-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {
  constructor(
    private cuentaUsuarioService: CuentaUsuarioService,

  ) {}

  @Input()
  cargar = false;

  @Output()
  cuenta = new EventEmitter<Cuenta>();

  cuentasUsuario: CuentaUsuario[] = [];
  helper = new JwtHelperService();

  ngOnInit() {
    this.cuentaUsuarioService.getCuentaUsuario().subscribe(cu => {
      this.cuentasUsuario = [];
      cu.forEach(val => {
        if (
          val.cuenta.fechaCuenta === moment().format('YYYY-MM-DD') &&
          val.cuenta.cobrada === false &&
          val.cuenta.cobrable === true
        ) {
          this.cuentasUsuario.push(val);
        }
      });
    });
  }

  cargarCuentas() {
    this.cuentaUsuarioService.getCuentaUsuario().subscribe(cu => {
      this.cuentasUsuario = [];
      cu.forEach(val => {
        if (
          val.cuenta.fechaCuenta === moment().format('YYYY-MM-DD') &&
          val.cuenta.cobrada === false &&
          val.cuenta.cobrable === true
        ) {
          this.cuentasUsuario.push(val);
        }
      });
    });
  }

  cargarCuenta(event: Cuenta) {
    this.cuenta.emit(event);
  }
}
