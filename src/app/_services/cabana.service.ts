import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cabana } from '../_model/cabana';
import { Observable } from 'rxjs';
import { Backend } from '../_constantes/backend';
import { Message } from '../_model/message';

@Injectable()
export class CabanaService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/cabanas`;


  constructor(private client: HttpClient) {}

  getCabanas(): Observable<Cabana[]> {

    return this.client.get<Cabana[]>(this.URL_API );
  }
  getCabanaById(cod: string): Observable<Cabana> {
    return this.client.get<Cabana>(`${this.URL_API}/${cod}` );
  }
  getCabanaByNombre(nombre: string): Observable<Cabana[]> {
    return this.client.get<Cabana []>(`${this.URL_API}/busqueda/${nombre}` );
  }
  addCabana(cabana: Cabana): Observable<Cabana> {
    return this.client.post<Cabana>(this.URL_API, cabana );
  }
  updateCabana(cabana: Cabana): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/update`, cabana );
  }
  deleteCabana(cabana: Cabana): Observable<Message> {

    return this.client.post<Message>(`${this.URL_API}/delete`, cabana );
  }
}
