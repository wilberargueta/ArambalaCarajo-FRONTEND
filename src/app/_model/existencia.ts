import { Producto } from './producto';

export class Existencia {
  constructor(
    public idExistencias: number,
    public cantidad: number,
    public productos: Producto
  ) {}

}
