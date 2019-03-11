import { Message } from 'primeng/api';
import { VentaTarjeta } from './../_model/venta-tarjeta';
import { HttpClient } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../_model/venta';
import { Tarjeta } from '../_model/tarjeta';

@Injectable({
  providedIn: 'root'
})
export class VentaTarjetaService {
  private URL: Backend = new Backend('');
  private URL_API = `${this.URL.URL_BACKEND}/api/ventatarjeta`;

  constructor(private client: HttpClient) {}

  addVentaTarjeta(vt: VentaTarjeta): Observable<VentaTarjeta> {
    return this.client.post<VentaTarjeta>(this.URL_API, vt);
  }
  updateVentaTarjeta(vt: VentaTarjeta): Observable<VentaTarjeta> {
    return this.client.post<VentaTarjeta>(`${this.URL_API}/update`, vt);
  }
  deleteVentaTarjeta(vt: VentaTarjeta): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/delete`, vt);
  }

  getVentaTarjeta(): Observable<VentaTarjeta[]> {
    return this.client.get<VentaTarjeta[]>(this.URL_API);
  }
  getVentaTarjetaById(vt: VentaTarjeta): Observable<VentaTarjeta> {
    return this.client.get<VentaTarjeta>(`${this.URL_API}/${vt.idVentaTarjeta}`);
  }
  getVentaTarjetaByVenta(vt: Venta): Observable<VentaTarjeta[]> {
    return this.client.post<VentaTarjeta[]>(`${this.URL_API}/venta`, vt);
  }
  getVentaTarjetaByTarjeta(vt: Tarjeta): Observable<VentaTarjeta[]> {
    return this.client.post<VentaTarjeta[]>(`${this.URL_API}/tarjeta`, vt);
  }
}
