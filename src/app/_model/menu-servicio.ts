import { Servicio } from './servicio';
import { Menu } from './menu';
export class MenuServicio {
  constructor(
    private idMenuServicio: number,
    private menu: Menu,
    private servicio: Servicio,
    private cantidad: number
  ) {}

  getIdMenuServicio(): number {
    return this.idMenuServicio;
  }

  setIdMenuServicio(idMenuServicio: number) {
    this.idMenuServicio = idMenuServicio;
  }

  getMenu(): Menu {
    return this.menu;
  }

  setMenu(menu: Menu) {
    this.menu = menu;
  }

  getServicio(): Servicio {
    return this.servicio;
  }

  setServicio(servicio: Servicio) {
    this.servicio = servicio;
  }

  getCantidad() {
    return this.cantidad;
  }

  setCantidad(cantidad) {
    this.cantidad = cantidad;
  }
}
