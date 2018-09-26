import { Receta } from './receta';
import { Menu } from './menu';
export class MenuReceta {
  constructor(
    public idMenuReceta: number,
    public receta: Receta,
    public menu: Menu
  ) {}

  getIdMenuReceta(): number {
    return this.idMenuReceta;
  }

  setIdMenuReceta(idMenuReceta: number) {
    this.idMenuReceta = idMenuReceta;
  }

  getReceta(): Receta {
    return this.receta;
  }

  setReceta(receta: Receta) {
    this.receta = receta;
  }

  getMenu(): Menu {
    return this.menu;
  }

  setMenu(menu: Menu) {
    this.menu = menu;
  }
}
