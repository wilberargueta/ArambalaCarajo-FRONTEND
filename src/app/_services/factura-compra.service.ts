import { Injectable } from '@angular/core';
import { Backend } from '../_constantes/backend';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FacturaCompra } from '../_model/factura-compra';
import { Observable } from 'rxjs';
import { Message } from '../_model/message';
import { Factura } from '../_model/factura';
import { Compra } from '../_model/compra';

@Injectable()
export class FacturaCompraService {

  private backend: Backend;
  private URL_API = `${this.backend.URL_BACKEND}/api/facturaCompra`;
  constructor(private client: HttpClient) { }

  addFacturaCompra(fc: FacturaCompra): Observable<Message> {
    return this.client.post<Message>(this.URL_API, fc);
  }
  updateFacturaCompra(fc: FacturaCompra): Observable<Message> {
    return this.client.put<Message>(this.URL_API, fc);
  }
  deleteFacturaCompra(fc: FacturaCompra): Observable<Message> {
    const htttOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: fc
    };

    return this.client.delete<Message>(this.URL_API, htttOptions);
  }
  getFacturaCompra(): Observable<FacturaCompra[]> {
    return this.client.get<FacturaCompra[]>(this.URL_API);
  }

  getFacturaCompraByCod(cod: number): Observable<FacturaCompra> {
    return this.client.get<FacturaCompra>(`${this.URL_API}/${cod}`);
  }
  getFacturaCompraByFactura(factura: Factura): Observable<FacturaCompra> {
    const htttOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: factura
    };
    return this.client.get<FacturaCompra>(this.URL_API, htttOptions);
  }
  getFacturaCompraByCompra(compra: Compra): Observable<FacturaCompra> {
    const htttOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: compra
    };
    return this.client.get<FacturaCompra>(this.URL_API, htttOptions);
  }
}
