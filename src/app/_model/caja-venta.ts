import { Caja } from './caja';
import { Cuenta } from './cuenta';
import { Venta } from './venta';
export class CajaVenta {
  constructor(
    public idCajaVenta: number,
    public venta: Venta,
    public cuenta: Cuenta,
    public caja: Caja
  ) {}
}
