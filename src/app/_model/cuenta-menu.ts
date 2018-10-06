import { Menu } from './menu';
import { Cuenta } from './cuenta';
export class CuentaMenu {
  constructor(
    public idCuentaMenu: number,
    public cuenta: Cuenta,
    public menu: Menu,
    public cantidad: number
  ) {}
}
