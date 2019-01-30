import { Factura } from './factura';
import { Compra } from './compra';

export class FacturaCompra {
  constructor(
    public idFacturaCompra: number,
    public compra: Compra,
    public factura: Factura
  ) {}
}
