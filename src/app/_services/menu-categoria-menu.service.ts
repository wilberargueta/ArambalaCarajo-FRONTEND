import { Message } from './../_model/message';
import { MenuCategoriaMenu } from './../_model/menu-categoria-menu';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Menu } from '../_model/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuCategoriaMenuService {
  private api = new Backend('');
  private URL_API = `${this.api.URL_BACKEND}/api/menuCategoriaMenu`;

  constructor(private client: HttpClient) {}

  addCategoria(categoria: MenuCategoriaMenu): Observable<MenuCategoriaMenu> {
    return this.client.post<MenuCategoriaMenu>(this.URL_API, categoria);
  }
  updateCategoria(categoria: MenuCategoriaMenu): Observable<MenuCategoriaMenu> {
    return this.client.post<MenuCategoriaMenu>(`${this.URL_API}/update`, categoria);
  }
  deleteCategoria(categoria: MenuCategoriaMenu): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/delete`, categoria);
  }

  getCategoria(): Observable<MenuCategoriaMenu[]> {
    return this.client.get<MenuCategoriaMenu[]>(this.URL_API);
  }
  getCategoriaById(id: number): Observable<MenuCategoriaMenu> {
    return this.client.get<MenuCategoriaMenu>(`${this.URL_API}/${id}`);
  }
  getCategoriaByMenu(menu: Menu): Observable<MenuCategoriaMenu> {
    return this.client.post<MenuCategoriaMenu>(`${this.URL_API}/menu`, menu);
  }
}
