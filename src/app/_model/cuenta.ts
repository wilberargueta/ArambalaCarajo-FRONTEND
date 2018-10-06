export class Cuenta {
  constructor(
    public idCuenta: string,
    public fechaCuenta: string,
    public descuento: string,
    public nombre: string,
    public mesa: number,
    public cobrada: boolean
  ) {}
}
