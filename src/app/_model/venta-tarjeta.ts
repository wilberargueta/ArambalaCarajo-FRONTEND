import { Tarjeta } from './tarjeta';
import { Venta } from './venta';
export class VentaTarjeta {
  constructor(
    public idVentaTarjeta: number,
    public venta: Venta,
    public tarjeta: Tarjeta
  ) {}
}
