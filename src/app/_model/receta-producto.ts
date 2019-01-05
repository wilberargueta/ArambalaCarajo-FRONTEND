import { Producto } from './producto';
import { Receta } from './receta';
import { MedidaProducto } from './medida-producto';
export class RecetaProducto {
  constructor(
    public idRecetaProducto: number,
    public receta: Receta,
    public producto: Producto,
    public cantidad: number,
    public medida: MedidaProducto
  ) {}
}
