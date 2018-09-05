import { Proveedor } from './proveedor';
export class Compra {
  constructor(
    public idCompra: number,
    public registroCompra: string,
    public fechaCompra: string,
    public detalle: string,
    public proveedor: Proveedor
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
