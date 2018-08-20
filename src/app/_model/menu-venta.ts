import { Venta } from './venta';
import { Menu } from './menu';
export class MenuVenta {
  constructor(
    private idVentaMenu: number,
    private menu: Menu,
    private venta: Venta,
    private cantidad: number
  ) {}

  getIdVentaMenu(): number {
    return this.idVentaMenu;
  }

  setIdVentaMenu(idVentaMenu: number) {
    this.idVentaMenu = idVentaMenu;
  }

  getMenu(): Menu {
    return this.menu;
  }

  setMenu(menu: Menu) {
    this.menu = menu;
  }

  getVenta(): Venta {
    return this.venta;
  }

  setVenta(venta: Venta) {
    this.venta = venta;
  }

  getCantidad(): number {
    return this.cantidad;
  }

  setCantidad(cantidad: number) {
    this.cantidad = cantidad;
  }
}
