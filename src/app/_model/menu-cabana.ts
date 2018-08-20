import { Menu } from './menu';
import { Cabaña } from './caba\u00F1a';

export class MenuCabana {
  constructor(
    private idCabañaMenu: number,
    private cabaña: Cabaña,
    private menu: Menu,
    private fechaInicio: Date,
    private fechaFinal: Date
  ) {}

  getIdCabañaMenu(): number {
    return this.idCabañaMenu;
  }

  setIdCabañaMenu(idCabañaMenu: number) {
    this.idCabañaMenu = idCabañaMenu;
  }

  getCabaña(): Cabaña {
    return this.cabaña;
  }

  setCabaña(cabaña: Cabaña) {
    this.cabaña = cabaña;
  }

  getMenu(): Menu {
    return this.menu;
  }

  setMenu(menu: Menu) {
    this.menu = menu;
  }

  getFechaInicio(): Date {
    return this.fechaInicio;
  }

  setFechaInicio(fechaInicio: Date) {
    this.fechaInicio = fechaInicio;
  }

  getFechaFinal(): Date {
    return this.fechaFinal;
  }

  setFechaFinal(fechaFinal: Date) {
    this.fechaFinal = fechaFinal;
  }
}
