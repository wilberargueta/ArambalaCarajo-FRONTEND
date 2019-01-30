import { Venta } from './venta';
import { Ticket } from './ticket';
export class TicketVenta {
  constructor(
    public idTicketVenta: number,
    public ticket: Ticket,
    public venta: Venta
  ) {}
}
