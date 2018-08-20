import { Factura } from './factura';
import { Venta } from './venta';
export class FacturaVenta {
  constructor(
    private idFacturaVenta: number,
    private venta: Venta,
    private factura: Factura
  ) {}

  getIdFacturaVenta(): number {
    return this.idFacturaVenta;
  }

  setIdFacturaVenta(idFacturaVenta: number) {
    this.idFacturaVenta = idFacturaVenta;
  }

  getVenta(): Venta {
    return this.venta;
  }

  setVenta(venta: Venta) {
    this.venta = venta;
  }

  getFactura(): Factura {
    return this.factura;
  }

  setFactura(factura: Factura) {
    this.factura = factura;
  }
}
