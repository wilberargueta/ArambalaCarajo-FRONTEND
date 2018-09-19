import { Menu } from './menu';
import { CategoriaMenu } from './categoria-menu';
export class MenuCategoriaMenu {
  constructor(
    public id: number,
    public categoria: CategoriaMenu,
    public menu: Menu
  ) {}
}
