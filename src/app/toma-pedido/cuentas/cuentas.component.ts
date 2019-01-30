import { JwtHelperService } from '@auth0/angular-jwt';
import { CuentaUsuario } from './../../_model/cuenta-usuario';
import { CuentaUsuarioService } from './../../_services/cuenta-usuario.service';
import { Usuario } from './../../_model/usuario';
import { UsuarioService } from './../../_services/usuario.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';
import { Cuenta } from '../../_model/cuenta';
import { CuentaService } from '../../_services/cuenta.service';

@Component({
  selector: 'ac-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {
  constructor(
    private usuarioService: UsuarioService,
    private cuentaUsuarioService: CuentaUsuarioService,
    private cuentaServicio: CuentaService
  ) {}

  @Input()
  cargar = false;

  @Output()
  cuenta = new EventEmitter<Cuenta>();

  cuentasUsuario: CuentaUsuario[] = [];
  helper = new JwtHelperService();
  usuario: Usuario = new Usuario(null, null, null);

  ngOnInit() {
    const nick = this.helper.decodeToken(sessionStorage.getItem('token')).sub;
    this.usuarioService.getUsuarioByOneNick(nick).subscribe(user => {
      this.usuario = user;
      this.cuentaUsuarioService
        .getCuentaUsuarioByUsuario(this.usuario)
        .subscribe(cu => {
          this.cuentasUsuario = [];
          cu.forEach(val => {
            if (
              val.cuenta.fechaCuenta === moment().format('YYYY-MM-DD') &&
              val.cuenta.cobrada === false
            ) {
              this.cuentasUsuario.push(val);
            }
          });
        });
    });
  }

  cargarCuentas() {
    this.cuentaUsuarioService
      .getCuentaUsuarioByUsuario(this.usuario)
      .subscribe(cu => {
        this.cuentasUsuario = [];
        cu.forEach(val => {
          if (
            val.cuenta.fechaCuenta === moment().format('YYYY-MM-DD') &&
            val.cuenta.cobrada === false
          ) {
            this.cuentasUsuario.push(val);
          }
        });
      });
  }

  cargarCuenta(event: Cuenta) {
    this.cuenta.emit(event);
  }
  cobrarCuenta(event: Cuenta) {
    event.cobrable = true;
    this.cuentaServicio.updateCuenta(event).subscribe(resul => {});
  }
}
