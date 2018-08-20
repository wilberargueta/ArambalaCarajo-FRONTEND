import { Injectable } from '@angular/core';
import { Backend } from '../_constantes/backend';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Existencia } from '../_model/existencia';
import { Observable } from 'rxjs';
import { Message } from '../_model/message';
import { Producto } from '../_model/producto';

@Injectable()
export class ExistenciaService {
  private backend: Backend;
  private URL_API = `${this.backend.URL_BACKEND}/api/existencias`;
  constructor(private client: HttpClient) { }

  addExistencias(existencias: Existencia): Observable<Message> {
    return this.client.post<Message>(this.URL_API, existencias)
  }
  updateExistencias(existencia: Existencia): Observable<Message> {
    return this.client.put<Message>(this.URL_API, existencia);
  }
  deleteExistencias(existencia: Existencia): Observable<Message> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: existencia
    };

    return this.client.delete<Message>(this.URL_API, httpOptions);

  }

  getExistencias(): Observable<Existencia[]> {
    return this.client.get<Existencia[]>(this.URL_API);
  }

  getExistenciasByCod(cod: string): Observable<Existencia> {
    return this.client.get<Existencia>(`${this.URL_API}/${cod}`);
  }

  getExistenciaByProducto(producto: Producto): Observable<Existencia> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: producto
    };

    return this.client.get<Existencia>(`${this.URL_API}/producto`, httpOptions);
  }
}
