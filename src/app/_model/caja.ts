import { Usuario } from './usuario';
export class Caja {
  constructor(
    public idCaja: number,
    public aperturaCaja: string,
    public cierreCaja: string,
    public montoApertura: string,
    public montoCierre: string,
    public usuario: Usuario,
    public cajaCerrada: boolean
  ) {}
}
