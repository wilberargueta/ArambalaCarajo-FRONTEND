import { CajaMultiValues } from './../_model/caja-multi-values';
import { Usuario } from './../_model/usuario';
import { Message } from './../_model/message';
import { Observable } from 'rxjs';
import { Caja } from './../_model/caja';
import { Backend } from './../_constantes/backend';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CajaService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/caja`;
  constructor(private client: HttpClient) {}

  addCaja(caja: Caja): Observable<Caja> {
    return this.client.post<Caja>(this.URL_API, caja);
  }

  updateCaja(caja: Caja): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/update`, caja);
  }
  deleteCaja(caja: Caja): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/delete`, caja);
  }

  getCaja(): Observable<Caja[]> {
    return this.client.get<Caja[]>(this.URL_API);
  }

  getCajaById(id: number): Observable<Caja> {
    return this.client.get<Caja>(`${this.URL_API}/${id}`);
  }

  getCajaByUsuario(usuario: Usuario): Observable<Caja[]> {
    return this.client.post<Caja[]>(`${this.URL_API}/usuario`, usuario);
  }
  getCajaByValores(usuario: Usuario, aperturaCaja: string): Observable<Caja> {
    const valores = new CajaMultiValues(aperturaCaja, usuario);
    return this.client.post<Caja>(`${this.URL_API}/valores`, valores);
  }
}
