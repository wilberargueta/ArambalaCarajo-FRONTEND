import { Usuario } from './../_model/usuario';
import { Message } from './../_model/message';
import { Observable } from 'rxjs';
import { CuentaUsuario } from './../_model/cuenta-usuario';
import { HttpClient } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Cuenta } from '../_model/cuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentaUsuarioService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/cuentaUsuario`;
  constructor(private client: HttpClient) {}

  addCuentaUsuario(cuentaUsuario: CuentaUsuario): Observable<CuentaUsuario> {
    return this.client.post<CuentaUsuario>(this.URL_API, cuentaUsuario);
  }

  updateCuentaUsuario(cuentaUsuario: CuentaUsuario): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/update`, cuentaUsuario);
  }

  deleteCuentaUsuario(cuentaUsuario: CuentaUsuario): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/delete`, cuentaUsuario);
  }
  getCuentaUsuario(): Observable<CuentaUsuario[]> {
    return this.client.get<CuentaUsuario[]>(this.URL_API);
  }

  getCuentaUsuarioById(id: number): Observable<CuentaUsuario> {
    return this.client.get<CuentaUsuario>(`${this.URL_API}/${id}`);
  }

  getCuentaUsuarioByUsuario(usuario: Usuario): Observable<CuentaUsuario[]> {
    return this.client.post<CuentaUsuario[]>(
      `${this.URL_API}/usuario`,
      usuario
    );
  }
  getCuentaUsuarioByCuenta(cuenta: Cuenta): Observable<CuentaUsuario> {
    return this.client.post<CuentaUsuario>(`${this.URL_API}/cuenta`, cuenta);
  }
  deleteCuentaUsuarioByCuenta(cuenta: Cuenta): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/cuenta/delete`, cuenta);
  }
}
