import { Producto } from './producto';

export class Existencia {
  constructor(
    private idExistencias: number,
    private cantidad: number,
    private producto: Producto
  ) {}

getIdExistencias() {
      return this.idExistencias;
   }

setIdExistencias( idExistencias) {
      this.idExistencias = idExistencias;
   }

   getCantidad() {
      return this.cantidad;
   }

setCantidad( cantidad) {
      this.cantidad = cantidad;
   }

getProductos(): Producto {
      return this.producto;
   }

setProductos(productos: Producto) {
      this.producto = productos;
   }

}
