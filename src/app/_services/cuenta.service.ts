import { Message } from './../_model/message';
import { Cuenta } from './../_model/cuenta';
import { HttpClient } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/cuenta`;
  constructor(private client: HttpClient) {}

  addCuenta(cuenta: Cuenta): Observable<Cuenta> {
    return this.client.post<Cuenta>(this.URL_API, cuenta);
  }

  updateCuenta(cuenta: Cuenta): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/update`, cuenta);
  }

  deleteCuenta(cuenta: Cuenta): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/delete`, cuenta);
  }
  getCuenta(): Observable<Cuenta[]> {
    return this.client.get<Cuenta[]>(this.URL_API);
  }

  getCuentaById(id: string): Observable<Cuenta> {
    return this.client.get<Cuenta>(`${this.URL_API}/${id}`);
  }

  getCuentaByFecha(fecha: string): Observable<Cuenta[]> {
    return this.client.get<Cuenta[]>(`${this.URL_API}/fecha/${fecha}`);
  }
}
