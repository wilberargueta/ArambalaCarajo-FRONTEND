import { Respuesta } from './../_model/respuesta';
import { Message } from './../_model/message';
import { Usuario } from './../_model/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private backend = new Backend('');
  private URL_API = `${this.backend.URL_BACKEND}/api/usuario`;

  constructor(private client: HttpClient) {}

  addUsuario(u: Usuario): Observable<Respuesta> {
    return this.client.post<Respuesta>(this.URL_API, u);
  }

  updateUsuario(u: Usuario): Observable<Respuesta> {
    return this.client.post<Respuesta>(`${this.URL_API}/update`, u);
  }
  deleteUsuario(u: Usuario): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/delete`, u);
  }

  getUsuario(): Observable<Usuario[]> {
    return this.client.get<Usuario[]>(this.URL_API);
  }
  getUsuarioById(id: number): Observable<Usuario> {
    return this.client.get<Usuario>(`${this.URL_API}/id/${id}`);
  }
  getUsuarioByNick(nick: string): Observable<Usuario[]> {
    return this.client.get<Usuario[]>(`${this.URL_API}/nick/${nick}`);
  }
  getUsuarioByOneNick(nick: string): Observable<Usuario> {
    return this.client.get<Usuario>(`${this.URL_API}/${nick}`);
  }
}
