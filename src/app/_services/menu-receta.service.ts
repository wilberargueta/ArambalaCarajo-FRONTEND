import { MenuReceta } from './../_model/menu-receta';
import { Injectable } from '@angular/core';
import { Backend } from '../_constantes/backend';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../_model/message';
import { Menu } from '../_model/menu';

@Injectable()
export class MenuRecetaService {

  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/menuRecetas`;
  constructor(private client: HttpClient) { }

  addMenuReceta(mr: MenuReceta): Observable<MenuReceta> {
    return this.client.post<MenuReceta>(this.URL_API, mr);
  }
  updateMenuReceta(mr: MenuReceta): Observable<Message> {
    return this.client.put<Message>(this.URL_API, mr);
  }
  deleteMenuReceta(mr: MenuReceta): Observable<Message> {

    return this.client.put<Message>(`${this.URL_API}/delete`, mr );
  }
  deleteMenuRecetaByMenu(memu: Menu): Observable<Message> {

    return this.client.put<Message>(`${this.URL_API}/delete/menu`, memu );
  }
  getMenuReceta(): Observable<MenuReceta[]> {
    return this.client.get<MenuReceta[]>(this.URL_API);
  }

  getMenuRecetaById(id: number): Observable<MenuReceta> {
    return this.client.get<MenuReceta>(`${this.URL_API}/${id}`);
  }
  getMenuRecetaByMenu(menu: Menu): Observable<MenuReceta[]> {

    return this.client.post<MenuReceta[]>(`${this.URL_API}/menu`, menu);
  }

}
