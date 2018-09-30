import { Proveedor } from './../_model/proveedor';
import { Message } from './../_model/message';
import { Observable } from 'rxjs';
import { Backend } from './../_constantes/backend';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compra } from '../_model/compra';

@Injectable()
export class CompraService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/compras`;

  constructor(private client: HttpClient) {}

  addCompra(compra: Compra): Observable<Message> {
    return this.client.post<Message>(this.URL_API, compra);
  }

  updateCompra(compra: Compra): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/update`, compra);
  }
  deleteCompra(compra: Compra): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/delete`, compra);
  }
  getCompras(): Observable<Compra[]> {
    return this.client.get<Compra[]>(this.URL_API);
  }
  getComprasById(id: number): Observable<Compra> {
    return this.client.get<Compra>(`${this.URL_API}/${id}`);
  }
  getComprasByRC(reg: string): Observable<Compra> {
    return this.client.get<Compra>(`${this.URL_API}/registro/${reg}`);
  }
  getCompraByProveedor(proveedor: Proveedor): Observable<Compra[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: proveedor
    };

    return this.client.get<Compra[]>(`${this.URL_API}/proveedor`, httpOptions);
  }
}
