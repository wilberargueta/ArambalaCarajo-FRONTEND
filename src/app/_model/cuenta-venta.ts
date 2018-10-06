import { Venta } from './venta';
import { Cuenta } from './cuenta';
export class CuentaVenta {
  constructor(
    public idCuentaVenta: number,
    public cuenta: Cuenta,
    public venta: Venta
  ) {}
}
