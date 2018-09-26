import { Message } from './../_model/message';
import { MenuCabana } from './../_model/menu-cabana';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Menu } from '../_model/menu';

@Injectable()
export class MenuCabanaService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/menuCabana`;
  constructor(private client: HttpClient) {}

  getMenuCabana(): Observable<MenuCabana[]> {
    return this.client.get<MenuCabana[]>(this.URL_API);
  }

  getMenuCabanaById(id: number): Observable<MenuCabana> {
    return this.client.get<MenuCabana>(`${this.URL_API}/${id}`);
  }

  getMenuCabanaByMenu(menu: Menu): Observable<MenuCabana[]> {
    return this.client.put<MenuCabana[]>(`${this.URL_API}/menu`, menu);
  }
  addMenuCabana(mc: MenuCabana): Observable<MenuCabana> {
    return this.client.post<MenuCabana>(this.URL_API, mc);
  }
  updateMenuCabana(mc: MenuCabana): Observable<Message> {
    return this.client.put<Message>(this.URL_API, mc);
  }
  deleteMenuCabana(mc: MenuCabana): Observable<Message> {

    return this.client.put<Message>(`${this.URL_API}/delete`, mc);
  }
  deleteMenuCabanaByMenu(mc: Menu): Observable<Message> {

    return this.client.put<Message>(`${this.URL_API}/delete/menu`, mc);
  }
}
