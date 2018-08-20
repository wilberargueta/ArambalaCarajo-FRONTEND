import { Injectable } from '@angular/core';
import { Backend } from '../_constantes/backend';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FacturaVenta } from '../_model/factura-venta';
import { Observable } from 'rxjs';
import { Message } from '../_model/message';
import { Factura } from '../_model/factura';

@Injectable()
export class FacturaVentaService {
  private backend: Backend;
  private URL_API = `${this.backend}/api/facturaVenta`;
  constructor(private client: HttpClient) { }

  addFacturaVenta(fv: FacturaVenta): Observable<Message> {
    return this.client.post<Message>(this.URL_API, fv);
  }
  updateFacturaVenta(fv: FacturaVenta): Observable<Message> {
    return this.client.put<Message>(this.URL_API, fv);
  }
  deleteFacturaVenta(fv: FacturaVenta): Observable<Message> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: fv
    };
    return this.client.delete<Message>(this.URL_API, httpOptions);
  }

  getFacturaVenta(): Observable<FacturaVenta[]> {
    return this.client.get<FacturaVenta[]>(this.URL_API);
  }

  getFacturaVentaByCod(cod: number): Observable<FacturaVenta> {
    return this.client.get<FacturaVenta>(`${this.URL_API}/${cod}`);
  }

  getFacturaVentaByFactura(factura: Factura): Observable<FacturaVenta[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: factura
    };
    return this.client.get<FacturaVenta[]>(`${this.URL_API}/factura`, httpOptions);
  }

}
