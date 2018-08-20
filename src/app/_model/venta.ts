export class Venta {
  constructor(
    private idVenta: number,
    private numRegistro: string,
    private fecha: Date,
    private detalle: string
  ) {}

  getIdVenta() {
    return this.idVenta;
  }

  setIdVenta(idVenta) {
    this.idVenta = idVenta;
  }

  getNumRegistro() {
    return this.numRegistro;
  }

  setNumRegistro(numRegistro) {
    this.numRegistro = numRegistro;
  }

  getFecha(): Date {
    return this.fecha;
  }

  setFecha(fecha: Date) {
    this.fecha = fecha;
  }

  getDetalle() {
    return this.detalle;
  }

  setDetalle(detalle: string) {
    this.detalle = detalle;
  }
}
