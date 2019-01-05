import { Injectable } from '@angular/core';
import { Backend } from '../_constantes/backend';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedidaProducto } from '../_model/medida-producto';

@Injectable({
  providedIn: 'root'
})
export class MedidaProductoService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/medidaProducto`;
  constructor(private client: HttpClient) {}

  getMedidas(): Observable<MedidaProducto[]> {
    return this.client.get<MedidaProducto[]>(this.URL_API);
  }
  getMedidasById(id: number): Observable<MedidaProducto> {
    return this.client.get<MedidaProducto>(`${this.URL_API}/${id}`);
  }
}
