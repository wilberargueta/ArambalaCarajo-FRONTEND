import { Factura } from './factura';
import { Compra } from './compra';

export class FacturaCompra {
  constructor(
    private idFacturaCompra: number,
    private compra: Compra,
    private factura: Factura
  ) {}

  getIdFacturaCompra(): number {
    return this.idFacturaCompra;
  }

  setIdFacturaCompra(idFacturaCompra: number) {
    this.idFacturaCompra = idFacturaCompra;
  }

  getCompra(): Compra {
    return this.compra;
  }

  setCompra(compra: Compra) {
    this.compra = compra;
  }
  getFactura(): Factura {
    return this.factura;
  }

  setFactura(factura: Factura) {
    this.factura = factura;
  }
}
