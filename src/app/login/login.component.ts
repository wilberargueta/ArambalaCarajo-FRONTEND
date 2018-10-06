import { UsuarioService } from './../_services/usuario.service';
import { LoginParamService } from './../_services/login-param.service';
import { Message, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from './../_model/usuario';
import { LoginService } from './../_services/login.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'ac-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService, LoginParamService]
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private rout: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private sesion: LoginParamService,
    private usuarioService: UsuarioService
  ) {}
  user = new Usuario(null, null, null);
  msgs: Message[] = [];
  helper = new JwtHelperService();
  ngOnInit() {
    if (sessionStorage.getItem('token') !== null) {
      this.sesion.sessionActiva = false;
      // this.router.navigate(['']);
      sessionStorage.removeItem('token');
    }
  }

  ingresar() {
    this.loginService.loginSession(this.user).subscribe(
      resp => {
        const token = resp.headers.get('content-type');
        sessionStorage.setItem('token', token);
        const nick = this.helper.decodeToken(token).sub;
        this.usuarioService.getUsuarioByOneNick(nick).subscribe(data => {
          this.user = data;
          this.sesion.setUsuario = this.user;
          this.sesion.sessionActiva = true;
          this.router.navigate(['']);
        });
      },
      error => {
        this.user.nick = '';
        this.user.pass = '';
        this.messageService.add({
          severity: 'error',
          summary: 'Error De Logueo',
          detail: 'Usuario o Contraseña incorrectos'
        });
      }
    );
  }
}
