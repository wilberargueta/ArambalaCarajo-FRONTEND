import { Usuario } from './../_model/usuario';
import { Backend } from './../_constantes/backend';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private backend = new Backend('');
  private URL_LOGIN = `${this.backend.URL_BACKEND}/login`;
  constructor(private client: HttpClient) {}

  loginSession(usuario: Usuario): Observable<HttpResponse<any>> {
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
   });

    return this.client.post<any>(this.URL_LOGIN, usuario, {
      headers: httpHeaders,
      observe: 'response',
      responseType: 'json'
    });
  }
}
