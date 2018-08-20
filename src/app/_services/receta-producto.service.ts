import { Message } from './../_model/message';
import { Observable } from 'rxjs';
import { RecetaProducto } from './../_model/receta-producto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Backend } from '../_constantes/backend';
import { Receta } from '../_model/receta';

@Injectable()
export class RecetaProductoService {
  private backend: Backend;
  private URL_API = `${this.backend.URL_BACKEND}/api/recetaProductos`;

  constructor(private client: HttpClient) {}

  addRecetaProducto(rp: RecetaProducto): Observable<Message> {
    return this.client.post<Message>(this.URL_API, rp);
  }
  updateRecetaProducto(rp: RecetaProducto): Observable<Message> {
    return this.client.put<Message>(this.URL_API, rp);
  }
  deleteRecetaProducto(rp: RecetaProducto): Observable<Message> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: rp
    };
    return this.client.delete<Message>(this.URL_API, httpOptions);
  }
  getRecetaProducto(): Observable<RecetaProducto[]> {
    return this.client.get<RecetaProducto[]>(this.URL_API);
  }
  getRecetaProductoById(id: number): Observable<RecetaProducto> {
    return this.client.get<RecetaProducto>(`${this.URL_API}/${id}`);
  }
  getRecetaProductoByReceta(receta: Receta): Observable<RecetaProducto[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: receta
    };
    return this.client.get<RecetaProducto[]>(
      `${this.URL_API}/receta`,
      httpOptions
    );
  }
}
