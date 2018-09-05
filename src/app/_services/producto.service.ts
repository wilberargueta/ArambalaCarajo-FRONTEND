import { Message } from './../_model/message';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Producto } from '../_model/producto';

@Injectable()
export class ProductoService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/productos`;

  constructor(private client: HttpClient) {}

  addProducto(producto: Producto): Observable<Message> {
    return this.client.post<Message>(this.URL_API, producto);
  }
  updateProducto(producto: Producto): Observable<Message> {
    return this.client.put<Message>(this.URL_API, producto);
  }
  deleteProducto(producto: Producto): Observable<Message> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: producto
    };
    return this.client.delete<Message>(this.URL_API, httpOptions);
  }
  getProducto(): Observable<Producto[]> {
    return this.client.get<Producto[]>(this.URL_API);
  }
  getProductoByCod(cod: string): Observable<Producto> {
    return this.client.get<Producto>(`${this.URL_API}/${cod}`);
  }
  getProductoByNombre(nombre: string): Observable<Producto[]> {
    return this.client.get<Producto[]>(`${this.URL_API}/nombre/${nombre}`);
  }
}
