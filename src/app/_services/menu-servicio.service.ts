import { Message } from './../_model/message';
import { MenuServicio } from './../_model/menu-servicio';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuServicioService {
  private backend: Backend;
  private URL_API = `${this.backend.URL_BACKEND}/api/menuServicio`;
  constructor(private client: HttpClient) {}

  getMenuServicio(): Observable<MenuServicio[]> {
    return this.client.get<MenuServicio[]>(this.URL_API);
  }
  getMenuServicioById(id: number): Observable<MenuServicio> {
    return this.client.get<MenuServicio>(`${this.URL_API}/${id}`);
  }
  addMenuServicio(ms: MenuServicio): Observable<Message> {
    return this.client.post<Message>(this.URL_API, ms);
  }
  updateMenuServicio(ms: MenuServicio): Observable<Message> {
    return this.client.put<Message>(this.URL_API, ms);
  }
  deleteMenuServicio(ms: MenuServicio): Observable<Message> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: ms
    };
    return this.client.delete<Message>(this.URL_API, httpOptions);
  }
}
