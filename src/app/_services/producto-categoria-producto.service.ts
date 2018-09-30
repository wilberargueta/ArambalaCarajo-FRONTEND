import { Observable } from 'rxjs';
import { ProductoCategoriaProducto } from './../_model/producto-categoria-producto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoCategoriaProductoService {
  private api = new Backend('');
  private URL_API = `${this.api.URL_BACKEND}/api/productoCategoriaProducto`;

  constructor(private client: HttpClient) {}

  addCategoria(
    categoria: ProductoCategoriaProducto
  ): Observable<ProductoCategoriaProducto> {
    return this.client.post<ProductoCategoriaProducto>(this.URL_API, categoria);
  }
  updateCategoria(
    categoria: ProductoCategoriaProducto
  ): Observable<ProductoCategoriaProducto> {
    return this.client.post<ProductoCategoriaProducto>(
      `${this.URL_API}/update`,
      categoria
    );
  }
  deleteCategoria(
    categoria: ProductoCategoriaProducto
  ): Observable<ProductoCategoriaProducto> {
    return this.client.post<ProductoCategoriaProducto>(
      `${this.URL_API}/delete`,
      categoria
    );
  }

  getCategoria(): Observable<ProductoCategoriaProducto[]> {
    return this.client.get<ProductoCategoriaProducto[]>(this.URL_API);
  }
  getCategoriaById(id: number): Observable<ProductoCategoriaProducto> {
    return this.client.get<ProductoCategoriaProducto>(`${this.URL_API}/${id}`);
  }
}
