import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cabaña } from '../_model/caba\u00F1a';
import { Observable } from 'rxjs';
import { Backend } from '../_constantes/backend';
import { Message } from '../_model/message';

@Injectable()
export class CabanaService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/cabanas`;
  constructor(private client: HttpClient) {}

  getCabanas(): Observable<Cabaña[]> {
    return this.client.get<Cabaña[]>(this.URL_API);
  }
  getCabanaById(cod: string): Observable<Cabaña> {
    return this.client.get<Cabaña>(`${this.URL_API}/${cod}`);
  }
  addCabana(cabana: Cabaña): Observable<Message> {
    return this.client.post<Message>(this.URL_API, cabana);
  }
  updateCabana(cabana: Cabaña): Observable<Message> {
    return this.client.put<Message>(this.URL_API, cabana);
  }
  deleteCabana(cabana: Cabaña): Observable<Message> {

    return this.client.delete<Message>(`${this.URL_API}/${cabana.codCabana}`);
  }
}
