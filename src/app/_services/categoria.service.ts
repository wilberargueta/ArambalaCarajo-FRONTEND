import { Observable } from 'rxjs';
import { Categoria } from './../_model/categoria';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Backend } from '../_constantes/backend';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/categoria`;

  constructor(private client: HttpClient) {}

  getCategoria(): Observable<Categoria[]> {
    return this.client.get<Categoria[]>(this.URL_API);
  }

  getCategoriaByCod(cod: string): Observable<Categoria> {
    return this.client.get<Categoria>(`${this.URL_API}/cod/${cod}`);
  }
  getCategoriaById(id: number): Observable<Categoria> {
    return this.client.get<Categoria>(`${this.URL_API}/${id}`);
  }
}
