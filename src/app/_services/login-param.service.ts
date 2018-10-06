import { Usuario } from './../_model/usuario';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class LoginParamService {
  constructor() {}
  private helper = new JwtHelperService();
  public sessionActiva = false;
  public usuario: Usuario;

  public set setUsuario(user: Usuario) {
    this.usuario = user;
  }
  public get getUsuario(): Usuario {
    return this.usuario;
  }
}
