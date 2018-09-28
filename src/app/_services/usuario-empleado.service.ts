import { Empleado } from './../_model/empleado';
import { Message } from './../_model/message';
import { UsuarioEmpleado } from './../_model/usuario-empleado';
import { HttpClient } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../_model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioEmpleadoService {

  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/usuarioEmpleado`;
  constructor(private client: HttpClient) { }

  addUsuarioEmpleado(u: UsuarioEmpleado): Observable<UsuarioEmpleado> {
    return this.client.post<UsuarioEmpleado>(this.URL_API, u);
  }
  updateUsuarioEmpleado(u: UsuarioEmpleado): Observable<Message> {
    return this.client.put<Message>(this.URL_API, u);
  }

  deleteUsuarioEmpleado(u: UsuarioEmpleado): Observable<Message> {
    return this.client.put<Message>(`${this.URL_API}/delete`, u);
  }
  getUsuarioEmpleado(): Observable<UsuarioEmpleado[]> {
    return this.client.get<UsuarioEmpleado[]>(this.URL_API);
  }
  getUsuarioEmpleadoByUsuario(u: Usuario): Observable<UsuarioEmpleado> {
    return this.client.put<UsuarioEmpleado>(`${this.URL_API}/usuario`, u);
  }
  getUsuarioEmpleadoByEmpleado(e: Empleado): Observable<UsuarioEmpleado> {
    return this.client.put<UsuarioEmpleado>(`${this.URL_API}/empleados`, e);
  }
  getUsuarioEmpleadoById(id: number): Observable<UsuarioEmpleado> {
    return this.client.get<UsuarioEmpleado>(`${this.URL_API}/${id}`);
  }

}
