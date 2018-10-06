import { Venta } from './../_model/venta';
import { Message } from './../_model/message';
import { Observable } from 'rxjs';
import { CuentaVenta } from './../_model/cuenta-venta';
import { HttpClient } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Cuenta } from '../_model/cuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentaVentaService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/cuentaVenta`;
  constructor(private client: HttpClient) {}

  addCuentaVenta(cuentaVenta: CuentaVenta): Observable<CuentaVenta> {
    return this.client.post<CuentaVenta>(this.URL_API, cuentaVenta);
  }

  updateCuentaVenta(cuentaVenta: CuentaVenta): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/update`, cuentaVenta);
  }

  deleteCuentaVenta(cuentaVenta: CuentaVenta): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/delete`, cuentaVenta);
  }
  getCuentaVenta(): Observable<CuentaVenta[]> {
    return this.client.get<CuentaVenta[]>(this.URL_API);
  }

  getCuentaVentaById(id: number): Observable<CuentaVenta> {
    return this.client.get<CuentaVenta>(`${this.URL_API}/${id}`);
  }

  getCuentaVentaByVenta(venta: Venta): Observable<CuentaVenta> {
    return this.client.post<CuentaVenta>(`${this.URL_API}/venta`, venta);
  }

  getCuentaVentaByCuenta(cuenta: Cuenta): Observable<CuentaVenta> {
    return this.client.post<CuentaVenta>(`${this.URL_API}/cuenta`, cuenta);
  }
}
