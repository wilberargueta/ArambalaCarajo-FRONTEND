import { Menu } from './menu';
import { Cabana } from './cabana';

export class MenuCabana {
  constructor(
    public idCabanaMenu: number,
    public cabana: Cabana,
    public menu: Menu,
    public fechaInicio: string,
    public fechaFinal: string
  ) {}

}
