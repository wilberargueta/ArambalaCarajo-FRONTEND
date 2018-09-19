import { Message } from './../_model/message';
import { Observable } from 'rxjs';
import { CategoriaProducto } from './../_model/categoria-producto';
import { HttpClient } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProductoService {
  private api = new Backend('');
  private URL_API = `${this.api.URL_BACKEND}/api/categoriaProducto`;
  constructor(private client: HttpClient) {}

  addCategoria(categoria: CategoriaProducto): Observable<CategoriaProducto> {
    return this.client.post<CategoriaProducto>(this.URL_API, categoria);
  }

  updateCategoria(categoria: CategoriaProducto): Observable<CategoriaProducto> {
    return this.client.put<CategoriaProducto>(this.URL_API, categoria);
  }
  deleteCategoria(categoria: CategoriaProducto): Observable<Message> {
    return this.client.put<Message>(`${this.URL_API}/delete`, categoria);
  }

  getCategoria(): Observable<CategoriaProducto[]> {
    return this.client.get<CategoriaProducto[]>(this.URL_API);
  }

  getCategoriaById(id: number): Observable<CategoriaProducto> {
    return this.client.get<CategoriaProducto>(`${this.URL_API}/${id}`);
  }
}
