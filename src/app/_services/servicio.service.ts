import { Receta } from './../_model/receta';
import { Message } from './../_model/message';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Servicio } from '../_model/servicio';

@Injectable()
export class ServicioService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/servicios`;

  constructor(private client: HttpClient) {}

  getServicio(): Observable<Servicio[]> {
    return this.client.get<Servicio[]>(this.URL_API);
  }
  getServicioById(id: number): Observable<Servicio> {
    return this.client.get<Servicio>(`${this.URL_API}/${id}`);
  }
  getServicioByNombre(nombre: string): Observable<Servicio[]> {
    return this.client.get<Servicio[]>(`${this.URL_API}/busqueda/${nombre}`);
  }
  addServicio(servicio: Servicio): Observable<Servicio> {
    return this.client.post<Servicio>(this.URL_API, servicio);
  }
  updateServicio(servicio: Servicio): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/update`, servicio);
  }
  deleteServicio(servicio: Servicio): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/delete`, servicio);
  }
}
