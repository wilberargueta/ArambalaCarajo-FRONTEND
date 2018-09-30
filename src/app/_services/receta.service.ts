import { Message } from './../_model/message';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Backend } from '../_constantes/backend';
import { Receta } from '../_model/receta';

@Injectable()
export class RecetaService {
  private backend: Backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/recetas`;

  constructor(private client: HttpClient) {}

  addReceta(receta: Receta): Observable<Receta> {
    return this.client.post<Receta>(this.URL_API, receta);
  }
  updateReceta(receta: Receta): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/update`, receta);
  }
  deleteReceta(receta: Receta): Observable<Message> {

    return this.client.post<Message>(`${this.URL_API}/delete`, receta);
  }

  getReceta(): Observable<Receta[]> {
    return this.client.get<Receta[]>(this.URL_API);
  }
  getRecetaById(id: number): Observable<Receta> {
    return this.client.get<Receta>(`${this.URL_API}/${id}`);
  }
  getRecetaByNombre(nombre: string): Observable<Receta[]> {
    return this.client.get<Receta[]>(`${this.URL_API}/busqueda/${nombre}`);
  }
}
