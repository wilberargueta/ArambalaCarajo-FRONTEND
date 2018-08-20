import { Message } from './../_model/message';
import { Observable } from 'rxjs';
import { CompraProducto } from './../_model/compra-producto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Compra } from '../_model/compra';

@Injectable()
export class CompraProductoService {
  private backend: Backend;
  private URL_API = `${this.backend.URL_BACKEND}/api/compraProducto`;
  constructor(private client: HttpClient) {}
  addCompraProducto(cp: CompraProducto): Observable<Message> {
    return this.client.post<Message>(this.URL_API, cp);
  }
  updateCompraProducto(cp: CompraProducto): Observable<Message> {
    return this.client.put<Message>(this.URL_API, cp);
  }
  deleteCompraProducto(cp: CompraProducto): Observable<Message> {
    return this.client.delete<Message>(
      `${this.URL_API}/${cp.getIdCompraProducto()}`
    );
  }
  getCompraProducto(): Observable<CompraProducto[]> {
    return this.client.get<CompraProducto[]>(this.URL_API);
  }
  getCompraProductoById(id: number): Observable<CompraProducto> {
    return this.client.get<CompraProducto>(`${this.URL_API}/${id}`);
  }
  getCompraProductoByCompra(compra: Compra): Observable<CompraProducto[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: compra
    };
    return this.client.get<CompraProducto[]>(
      `${this.URL_API}/compras`,
      httpOptions
    );
  }
}
