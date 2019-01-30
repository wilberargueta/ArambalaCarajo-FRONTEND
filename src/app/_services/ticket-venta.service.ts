import { Message } from './../_model/message';
import { HttpClient } from '@angular/common/http';
import { Backend } from './../_constantes/backend';
import { Injectable } from '@angular/core';
import { TicketVenta } from './../_model/ticket-venta';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TicketVentaService {
  private api = new Backend('');
  private URL_API = `${this.api.URL_BACKEND}/api/ticketventa`;
  constructor(private client: HttpClient) {}

  addTicketVenta(ticket: TicketVenta): Observable<TicketVenta> {
    return this.client.post<TicketVenta>(this.URL_API, ticket);
  }

  updateTicketVenta(ticket: TicketVenta): Observable<TicketVenta> {
    return this.client.post<TicketVenta>(`${this.URL_API}/update`, ticket);
  }
  deleteTicketVenta(ticket: TicketVenta): Observable<Message> {
    return this.client.post<Message>(`${this.URL_API}/delete`, ticket);
  }
  getAllTicketVenta(): Observable<TicketVenta[]> {
    return this.client.get<TicketVenta[]>(this.URL_API);
  }
  getTicketVentaById(id: number): Observable<TicketVenta> {
    return this.client.get<TicketVenta>(`${this.URL_API}/${id}`);
  }
  getTicketVentaByVenta(ticket: TicketVenta): Observable<TicketVenta> {
    return this.client.post<TicketVenta>(`${this.URL_API}/venta`, ticket.venta);
  }
  getTicketVentaByTicket(ticket: TicketVenta): Observable<TicketVenta> {
    return this.client.post<TicketVenta>(
      `${this.URL_API}/ticket`,
      ticket.ticket
    );
  }
}
