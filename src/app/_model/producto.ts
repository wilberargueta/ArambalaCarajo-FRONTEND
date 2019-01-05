import { MedidaProducto } from './medida-producto';
export class Producto {
  constructor(
    public codProducto: string,
    public nombre: string,
    public medida: MedidaProducto
  ) {}
}
