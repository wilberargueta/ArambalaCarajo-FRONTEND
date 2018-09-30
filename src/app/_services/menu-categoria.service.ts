import { Categoria } from './../_model/categoria';
import { MenuCategoria } from './../_model/menu-categoria';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../_model/message';
import { Menu } from '../_model/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuCategoriaService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/menuCategoria`;

  constructor(private client: HttpClient) {}

  addMenuCategoria(mc: MenuCategoria): Observable<MenuCategoria> {
    return this.client.post<MenuCategoria>(this.URL_API, mc);
  }

  updateMenuCategoria(mc: MenuCategoria): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/update`, mc);
  }

  deleteMenuCategoria(mc: MenuCategoria): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/delete`, mc);
  }
  getMenuCategoria(): Observable<MenuCategoria[]> {
    return this.client.get<MenuCategoria[]>(this.URL_API);
  }

  getMenuCategoriaByCategoria(cat: Categoria): Observable<MenuCategoria[]> {
    return this.client.post<MenuCategoria[]>(
      `${this.URL_API}/busqueda/categoria`,
      cat
    );
  }
  getMenuCategoriaById(id: number): Observable<MenuCategoria> {
    return this.client.get<MenuCategoria>(`${this.URL_API}/${id}`);
  }
  getMenuCategoriaByMenuAndCategoria(
    categoria: Categoria,
    menu: Menu
  ): Observable<MenuCategoria> {
    return this.client.post<MenuCategoria>(
      `${this.URL_API}/menu/${categoria.idCategoria}`,
      menu
    );
  }
}
