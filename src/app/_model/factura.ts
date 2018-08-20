export class Factura {
  constructor(
    private idFactura: number,
    private numFactura: string,
    private correlativoFactura: string,
    private fechaFactura: Date,
    private iva: string,
    private detalle: string
  ) {}

  getIdFactura(): number {
    return this.idFactura;
  }

  setIdFactura(idFactura): void {
    this.idFactura = idFactura;
  }

  getNumFactura() {
    return this.numFactura;
  }

  setNumFactura(numFactura) {
    this.numFactura = numFactura;
  }

  getCorrelativoFactura() {
    return this.correlativoFactura;
  }
  setCorrelativoFactura(correlativoFactura) {
    this.correlativoFactura = correlativoFactura;
  }

  getFechaFactura(): Date {
    return this.fechaFactura;
  }

  setFechaFactura(fechaFactura: Date) {
    this.fechaFactura = fechaFactura;
  }

  getIva() {
    return this.iva;
  }

  setIva(iva) {
    this.iva = iva;
  }

  getDetalle() {
    return this.detalle;
  }

  setDetalle(detalle) {
    this.detalle = detalle;
  }
}
