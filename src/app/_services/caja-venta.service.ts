import { Venta } from './../_model/venta';
import { Cuenta } from './../_model/cuenta';
import { Message } from './../_model/message';
import { Observable } from 'rxjs';
import { CajaVenta } from './../_model/caja-venta';
import { HttpClient } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Caja } from '../_model/caja';

@Injectable({
  providedIn: 'root'
})
export class CajaVentaService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/cajaVenta`;
  constructor(private client: HttpClient) {}

  addCajaVenta(cajaVenta: CajaVenta): Observable<CajaVenta> {
    return this.client.post<CajaVenta>(this.URL_API, cajaVenta);
  }

  updateCajaVenta(cajaVenta: CajaVenta): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/update`, cajaVenta);
  }

  deleteCajaVenta(cajaVenta: CajaVenta): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/delete`, cajaVenta);
  }
  getCajaVenta(): Observable<CajaVenta[]> {
    return this.client.get<CajaVenta[]>(this.URL_API);
  }
  getCajaVentaById(id: number): Observable<CajaVenta> {
    return this.client.get<CajaVenta>(`${this.URL_API}/${id}`);
  }
  getCajaVentaByCaja(caja: Caja): Observable<CajaVenta[]> {
    return this.client.post<CajaVenta[]>(`${this.URL_API}/caja`, caja);
  }
  getCajaVentaByCuenta(cuenta: Cuenta): Observable<CajaVenta> {
    return this.client.post<CajaVenta>(`${this.URL_API}/cuenta`, cuenta);
  }
  getCajaVentaByVenta(venta: Venta): Observable<CajaVenta> {
    return this.client.post<CajaVenta>(`${this.URL_API}/venta`, venta);
  }
}
