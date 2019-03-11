import { Message } from 'primeng/api';
import { Tarjeta } from './../_model/tarjeta';
import { HttpClient } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private URL: Backend = new Backend('');
  private URL_API = `${this.URL.URL_BACKEND}/api/tarjeta`;

  constructor(private client: HttpClient) {}

  addTarjeta(t: Tarjeta): Observable<Tarjeta> {
    return this.client.post<Tarjeta>(this.URL_API, t);
  }
  updateTarjeta(t: Tarjeta): Observable<Tarjeta> {
    return this.client.post<Tarjeta>(`${this.URL_API}/update`, t);
  }
  deleteTarjeta(t: Tarjeta): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/delete`, t);
  }
  getAllTarjetas(): Observable<Tarjeta[]> {
    return this.client.get<Tarjeta[]>(this.URL_API);
  }
  getTarjetaById(t: Tarjeta): Observable<Tarjeta> {
    return this.client.get<Tarjeta>(`${this.URL_API}/${t.idTarjeta}`);
  }
  getTarjetaByNumero(t: Tarjeta): Observable<Tarjeta> {
    return this.client.post<Tarjeta>(`${this.URL_API}/numero`, t);
  }
}
