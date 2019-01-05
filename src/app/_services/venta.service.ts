import { Message } from './../_model/message';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Venta } from '../_model/venta';

@Injectable()
export class VentaService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/ventas`;

  constructor(private client: HttpClient) {}

  addVenta(venta: Venta): Observable<Venta> {
    return this.client.post<Venta>(this.URL_API, venta);
  }
  updateVenta(venta: Venta): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/update`, venta);
  }
  deleteVenta(venta: Venta): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/delete`, venta);
  }

  getVenta(): Observable<Venta[]> {
    return this.client.get<Venta[]>(this.URL_API);
  }
  getVentaByRegistroVenta(id: string): Observable<Venta> {
    return this.client.get<Venta>(`${this.URL_API}/${id}`);
  }

  getVentaByFecha(fecha: string): Observable<Venta[]> {
    return this.client.get<Venta[]>(`${this.URL_API}/fecha/${fecha}`);
  }
}
