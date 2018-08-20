import { Proveedor } from './proveedor';
export class Compra {
  constructor(
    private idCompra: number,
    private registroCompra: string,
    private fechaCompra: Date,
    private detalle: string,
    private proveedor: Proveedor
  ) {}

getIdCompra() {
    return this.idCompra;
  }

setIdCompra( idCompra) {
    this.idCompra = idCompra;
  }
getRegistroCompra() {
    return this.registroCompra;
  }

  setRegistroCompra( registroCompra) {
    this.registroCompra = registroCompra;
  }

  getFechaCompra(): Date {
    return this.fechaCompra;
  }

 setFechaCompra( fechaCompra: Date) {
    this.fechaCompra = fechaCompra;
  }

getDetalle() {
    return this.detalle;
  }

setDetalle( detalle) {
    this.detalle = detalle;
  }

    getProveedor(): Proveedor {
    return this.proveedor;
  }

  setProveedor( proveedor: Proveedor) {
    this.proveedor = proveedor;
  }
}
