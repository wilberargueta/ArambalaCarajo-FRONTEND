import { Message, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from './../_model/usuario';
import { LoginService } from './../_services/login.service';
import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'ac-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private rout: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}
  user = new Usuario(null, null, null);
  msgs: Message[] = [];
  ngOnInit() {
    if (sessionStorage.getItem('token') === null) {
      // this.router.navigate(['/login'], { relativeTo: this.rout });
    } else {
      sessionStorage.removeItem('token');
      this.router.navigate(['/login'], { relativeTo: this.rout });
    }
  }

  ingresar() {
    this.loginService.loginSession(this.user).subscribe(
      resp => {
        const token = resp.headers.get('content-type');
        sessionStorage.setItem('token', token);
        this.router.navigate(['/'], { relativeTo: this.rout });
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
