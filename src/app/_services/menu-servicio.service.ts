import { Message } from './../_model/message';
import { MenuServicio } from './../_model/menu-servicio';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Menu } from '../_model/menu';

@Injectable()
export class MenuServicioService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/menuServicio`;
  constructor(private client: HttpClient) {}

  getMenuServicio(): Observable<MenuServicio[]> {
    return this.client.get<MenuServicio[]>(this.URL_API);
  }
  getMenuServicioById(id: number): Observable<MenuServicio> {
    return this.client.get<MenuServicio>(`${this.URL_API}/${id}`);
  }

  getMenuServicioByMenu(menu: Menu): Observable<MenuServicio[]> {
    return this.client.put<MenuServicio[]>(`${this.URL_API}/menu`, menu);
  }
  addMenuServicio(ms: MenuServicio): Observable<MenuServicio> {
    return this.client.post<MenuServicio>(this.URL_API, ms);
  }
  updateMenuServicio(ms: MenuServicio): Observable<Message> {
    return this.client.put<Message>(this.URL_API, ms);
  }
  deleteMenuServicio(ms: MenuServicio): Observable<Message> {
    return this.client.put<Message>(`${this.URL_API}/delete`, ms);
  }

  deleteMenuServicioByMenu(ms: Menu): Observable<Message> {
    return this.client.put<Message>(`${this.URL_API}/delete/menu`, ms);
  }
}
