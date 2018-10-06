import { Message } from './../_model/message';
import { Empleado } from './../_model/empleado';
import { Backend } from './../_constantes/backend';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/empleados`;

  constructor(private client: HttpClient) {}

  addEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.client.post<Empleado>(this.URL_API, empleado  );
  }
  updateEmpleado(empleado: Empleado): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/update`, empleado  );
  }
  deleteEmpleado(empleado: Empleado): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/delete`, empleado);
  }
  getEmpleado(): Observable<Empleado[]> {
    // console.log(this.URL_API);
    return this.client.get<Empleado[]>(this.URL_API  );
  }
  getEmpleadoByCod(cod: string): Observable<Empleado> {
    return this.client.get<Empleado>(
      `${this.URL_API}/${cod}`
    );
  }

  getEmpleadoByNombre(nombre: string): Observable<Empleado[]> {
    return this.client.get<Empleado[]>(
      `${this.URL_API}/nombre/${nombre}`
    );
  }
}
