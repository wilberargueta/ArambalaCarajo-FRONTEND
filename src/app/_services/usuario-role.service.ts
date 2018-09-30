import { Role } from './../_model/role';
import { Message } from './../_model/message';
import { Observable } from 'rxjs';
import { UsuarioRole } from './../_model/usuario-role';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Usuario } from '../_model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRoleService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/usuarioRole`;

  constructor(private client: HttpClient) {}

  addUsuarioRole(u: UsuarioRole): Observable<UsuarioRole> {
    return this.client.post<UsuarioRole>(this.URL_API, u);
  }
  updateUsuarioRole(u: UsuarioRole): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/update`, u);
  }

  deleteUsuarioRole(u: UsuarioRole): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/delete`, u);
  }
  getUsuarioRole(): Observable<UsuarioRole[]> {
    return this.client.get<UsuarioRole[]>(this.URL_API);
  }
  getUsuarioRoleById(id: number): Observable<UsuarioRole> {
    return this.client.get<UsuarioRole>(`${this.URL_API}/{id}`);
  }
  getUsuarioRoleByUsuario(u: Usuario): Observable<UsuarioRole> {
    return this.client.post<UsuarioRole>(`${this.URL_API}/usuario`, u);
  }
  getUsuarioRoleByRole(u: Role): Observable<UsuarioRole[]> {
    return this.client.post<UsuarioRole[]>(`${this.URL_API}/role`, u);
  }
}
