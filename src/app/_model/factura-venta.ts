import { Factura } from './factura';
import { Venta } from './venta';
export class FacturaVenta {
  constructor(
    public idFacturaVenta: number,
    public venta: Venta,
    public factura: Factura
  ) {}
}
