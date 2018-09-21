import { Message } from './../_model/message';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Menu } from '../_model/menu';

@Injectable()
export class MenuService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/menus`;

  constructor(private client: HttpClient) {}

  addMenu(menu: Menu): Observable<Menu> {
    return this.client.post<Menu>(this.URL_API, menu);
  }
  updateMenu(menu: Menu): Observable<Message> {
    return this.client.put<Message>(this.URL_API, menu);
  }
  deleteMenu(menu: Menu): Observable<Message> {
    return this.client.put<Message>(`${this.URL_API}/delete`, menu);
  }

  getMenu(): Observable<Menu[]> {
    return this.client.get<Menu[]>(this.URL_API);
  }
  getMenuById(id: number): Observable<Menu> {
    return this.client.get<Menu>(`${this.URL_API}/${id}`);
  }
}
