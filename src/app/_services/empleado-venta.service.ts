import { Empleado } from './../_model/empleado';

import { Message } from './../_model/message';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { EmpleadoVentas } from '../_model/empleado-ventas';

@Injectable()
export class EmpleadoVentaService {
  private backend: Backend;
  private URL_API = `${this.backend}/api/empleadoVentas`;

  constructor(private client: HttpClient) {}
  addEmpleadoVenta(ev: EmpleadoVentas): Observable<Message> {
    return this.client.post<Message>(this.URL_API, ev);
  }
  updateEmpleadoVenta(ev: EmpleadoVentas): Observable<Message> {
    return this.client.put<Message>(this.URL_API, ev);
  }
  deleteEmpleadoVenta(ev: EmpleadoVentas): Observable<Message> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: ev
    };

    return this.client.delete<Message>(this.URL_API, httpOptions);
  }
  getEmpleadoVenta(): Observable<EmpleadoVentas[]> {
    return this.client.get<EmpleadoVentas[]>(this.URL_API);
  }

  getEmpleadoVentaById(id: number): Observable<EmpleadoVentas> {
    return this.client.get<EmpleadoVentas>(`${this.URL_API}/${id}`);
  }

  getEmpleadoVentaByEmpleado(empleado: Empleado): Observable<EmpleadoVentas[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: empleado
    };
    return this.client.get<EmpleadoVentas[]>(
      `${this.URL_API}/empleado`,
      httpOptions
    );
  }
}
