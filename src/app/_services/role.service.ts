import { Role } from './../_model/role';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/role`;

  constructor(private client: HttpClient) {}

  getRole(): Observable<Role[]> {
    return this.client.get<Role[]>(this.URL_API);
  }

  getRoleById(id: number): Observable<Role> {
    return this.client.get<Role>(`${this.URL_API}/${id}`);
  }
  getRoleByRole(role: string): Observable<Role[]> {
    return this.client.get<Role[]>(`${this.URL_API}/busqueda/${role}`);
  }
}
