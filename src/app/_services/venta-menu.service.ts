import { Message } from './../_model/message';
import { Observable } from 'rxjs';
import { MenuVenta } from './../_model/menu-venta';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Venta } from '../_model/venta';

@Injectable()
export class VentaMenuService {

  private backend: Backend;
  private URL_API = `${this.backend.URL_BACKEND}/api/ventaMenus`;

  constructor(private client: HttpClient) { }

  addVentaMenu(mv: MenuVenta): Observable<Message> {
    return this.client.post<Message>(this.URL_API, mv);
  }
  updateVentaMenu(mv: MenuVenta): Observable<Message> {
    return this.client.put<Message>(this.URL_API, mv);
  }
  deleteVentaMenu(mv: MenuVenta): Observable<Message> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: mv
    };
    return this.client.delete<Message>(this.URL_API, httpOptions);
  }
  getVentaMenu(): Observable<MenuVenta[]> {
    return this.client.get<MenuVenta[]>(this.URL_API);
  }
  getVentaMenuById(id: number): Observable<MenuVenta> {
    return this.client.get<MenuVenta>(`${this.URL_API}/${id}`);
  }
  getVentaMenuByVenta(venta: Venta): Observable<MenuVenta[]> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: venta
    };
    return this.client.get<MenuVenta[]>(this.URL_API, httpOptions);
  }
}
