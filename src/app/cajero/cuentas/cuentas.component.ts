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
    private usuarioService: UsuarioService,
    private cuentaUsuarioService: CuentaUsuarioService
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
            if (val.cuenta.fechaCuenta === moment().format('YYYY-M-DD')) {
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
        console.log(cu);
        cu.forEach(val => {
          if (
            val.cuenta.fechaCuenta === moment().format('YYYY-M-DD') &&
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
  cobrarCuenta(event) {}

}
