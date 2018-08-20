import { Message } from './../_model/message';
import { MenuCabana } from './../_model/menu-cabana';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuCabanaService {
  private backend: Backend;
  private URL_API = `${this.backend.URL_BACKEND}/api/menuCabaña`;
  constructor(private client: HttpClient) {}

  getMenuCabana(): Observable<MenuCabana[]> {
    return this.client.get<MenuCabana[]>(this.URL_API);
  }

  getMenuCabanaById(id: number): Observable<MenuCabana> {
    return this.client.get<MenuCabana>(`${this.URL_API}/${id}`);
  }
  addMenuCabana(mc: MenuCabana): Observable<Message> {
    return this.client.post<Message>(this.URL_API, mc);
  }
  updateMenuCabana(mc: MenuCabana): Observable<Message> {
    return this.client.put<Message>(this.URL_API, mc);
  }
  deleteMenuCabana(mc: MenuCabana): Observable<Message> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: mc
    };
    return this.client.delete<Message>(this.URL_API, httpOptions);
  }
}
