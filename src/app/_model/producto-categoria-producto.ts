import { Producto } from './producto';
import { CategoriaProducto } from './categoria-producto';
export class ProductoCategoriaProducto {

    constructor(
      public id: number,
      public categoria: CategoriaProducto,
      public producto: Producto
    ){}
}
