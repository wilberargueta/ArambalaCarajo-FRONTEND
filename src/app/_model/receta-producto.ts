import { Producto } from './producto';
import { Receta } from './receta';
export class RecetaProducto {

  constructor(
    public idRecetaProducto: number,
    public receta: Receta,
    public producto: Producto,
    public cantidad: number
  ) {}

  getIdRecetaProducto(): number {
    return this.idRecetaProducto;
  }

  setIdRecetaProducto(idRecetaProducto: number) {
    this.idRecetaProducto = idRecetaProducto;
  }

  getReceta(): Receta {
    return this.receta;
  }

  setReceta(receta: Receta) {
    this.receta = receta;
  }

  getProducto(): Producto {
    return this.producto;
  }

  setProducto(producto: Producto) {
    this.producto = producto;
  }

  getCantidad(): number {
    return this.cantidad;
  }

  setCantidad(cantidad: number) {
    this.cantidad = cantidad;
  }
}
