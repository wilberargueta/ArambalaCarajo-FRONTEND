import { Message } from './../_model/message';
import { CategoriaMenu } from './../_model/categoria-menu';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaMenuService {
  private api = new Backend('');
  private URL_API = `${this.api.URL_BACKEND}/api/categoriaMenu`;

  constructor(private client: HttpClient) {}

  addCategoria(categoria: CategoriaMenu): Observable<CategoriaMenu> {
    return this.client.post<CategoriaMenu>(this.URL_API, categoria);
  }

  updateCategoria(categoria: CategoriaMenu): Observable<CategoriaMenu> {
    return this.client.post<CategoriaMenu>(`${this.URL_API}/update`, categoria);
  }
  deleteCategoria(categoria: CategoriaMenu): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/delete`, categoria);
  }

  getCategoria(): Observable<CategoriaMenu[]> {
    return this.client.get<CategoriaMenu[]>(this.URL_API);
  }

  getCategoriaById(id: number): Observable<CategoriaMenu> {
    return this.client.get<CategoriaMenu>(`${this.URL_API}/${id}`);
  }
  getCategoriaByBusqueda(busqueda: string): Observable<CategoriaMenu[]> {
    return this.client.get<CategoriaMenu[]>(
      `${this.URL_API}/busqueda/${busqueda}`
    );
  }
}
