import { Categoria } from './categoria';
import { Menu } from './menu';
export class MenuCategoria {
  constructor(
    public idMenuCategoria: number,
    public menu: Menu,
    public categoria: Categoria
  ) {}
}
