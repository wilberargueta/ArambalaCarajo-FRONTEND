import { Menu } from './menu';
import { CategoriaMenu } from './categoria-menu';
export class MenuCategoriaMenu {
  constructor(
    public id: number,
    public categoriaMenu: CategoriaMenu,
    public menu: Menu
  ) {}
}
