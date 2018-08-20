import { Injectable } from '@angular/core';
import { Backend } from '../_constantes/backend';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MenuReceta } from '../_model/menu-receta';
import { Observable } from 'rxjs';
import { Message } from '../_model/message';
import { Menu } from '../_model/menu';

@Injectable()
export class MenuRecetaService {

  private backend: Backend;
  private URL_API = `${this.backend.URL_BACKEND}/api/menuRecetas`;
  constructor(private client: HttpClient) { }

  addMenuReceta(mr: MenuReceta): Observable<Message> {
    return this.client.post<Message>(this.URL_API, mr);
  }
  updateMenuReceta(mr: MenuReceta): Observable<Message> {
    return this.client.put<Message>(this.URL_API, mr);
  }
  deleteMenuReceta(mr: MenuReceta): Observable<Message> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: mr
    };
    return this.client.delete<Message>(this.URL_API, httpOptions);
  }
  getMenuReceta(): Observable<MenuReceta[]> {
    return this.client.get<MenuReceta[]>(this.URL_API);
  }

  getMenuRecetaById(id: number): Observable<MenuReceta> {
    return this.client.get<MenuReceta>(`${this.URL_API}/${id}`);
  }
  getMenuRecetaByMenu(menu: Menu): Observable<MenuReceta[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: menu
    };
    return this.client.get<MenuReceta[]>(`${this.URL_API}/menu`, httpOptions);
  }

}
