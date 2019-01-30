import { TipoComprobante } from './../_model/tipo-comprobante';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoComprobanteService {
  private backend = new Backend('');
  private API_URL = `${this.backend.URL_BACKEND}/api/tipocomprobante`;
  constructor(private client: HttpClient) {}

  getComprobanteById(id: number): Observable<TipoComprobante> {
    return this.client.get<TipoComprobante>(`${this.API_URL}/id`);
  }

  getAllComprobantes(): Observable<TipoComprobante[]> {
    return this.client.get<TipoComprobante[]>(this.API_URL);
  }
  getComprobanteByComprobante(
    comprobante: string
  ): Observable<TipoComprobante> {
    return this.client.get<TipoComprobante>(
      `${this.API_URL}/comprobante/${comprobante}`
    );
  }
}
