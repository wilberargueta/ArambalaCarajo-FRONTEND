import { Message } from './../_model/message';
import { Observable } from 'rxjs';
import { CuentaMenu } from './../_model/cuenta-menu';
import { HttpClient } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Cuenta } from '../_model/cuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentaMenuService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/cuentaMenu`;
  constructor(private client: HttpClient) {}

  addCuentaMenu(cuentaMenu: CuentaMenu): Observable<CuentaMenu> {
    return this.client.post<CuentaMenu>(this.URL_API, cuentaMenu);
  }
  addListCuentaMenu(cuentaMenu: CuentaMenu []): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/all`, cuentaMenu);
  }

  updateCuentaMenu(cuentaMenu: CuentaMenu): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/update`, cuentaMenu);
  }

  deleteCuentaMenu(cuentaMenu: CuentaMenu): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/delete`, cuentaMenu);
  }
  getCuentaMenu(): Observable<CuentaMenu[]> {
    return this.client.get<CuentaMenu[]>(this.URL_API);
  }

  getCuentaMenuById(id: number): Observable<CuentaMenu> {
    return this.client.get<CuentaMenu>(`${this.URL_API}/${id}`);
  }

  getCuentaMenuByCuenta(cuenta: Cuenta): Observable<CuentaMenu[]> {
    return this.client.post<CuentaMenu[]>(`${this.URL_API}/cuenta`, cuenta);
  }
  deleteCuentaMenuByCuenta(cuenta: Cuenta): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/cuenta/delete`, cuenta);
  }
}
