import { Injectable } from '@angular/core';
import { Backend } from '../_constantes/backend';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Factura } from '../_model/factura';
import { Observable } from 'rxjs';
import { Message } from '../_model/message';

@Injectable()
export class FacturaService {
  private backend: Backend;
  private URL_API = `${this.backend.URL_BACKEND}/api/facturas`;
  constructor(private client: HttpClient) { }

  addFactura(factura: Factura): Observable<Message> {
    return this.client.post<Message>(this.URL_API, factura);
  }
  udpateFactura(factura: Factura): Observable<Message> {
    return this.client.put<Message>(this.URL_API, factura);
  }
  deleteFactura(factura: Factura): Observable<Message> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: factura
    };
    return this.client.delete<Message>(this.URL_API, httpOptions);
  }

  getFacturas(): Observable<Factura[]> {
    return this.client.get<Factura[]>(this.URL_API);
  }
  getFacturasBy(): Observable<Factura[]> {
    return this.client.get<Factura[]>(this.URL_API);
  }
  getFacturasByNumFactura(num: string): Observable<Factura> {
    return this.client.get<Factura>(`${this.URL_API}/${num}`);
  }

}
