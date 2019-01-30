export class Factura {
  constructor(
    public idFactura: number,
    public numFactura: string,
    public correlativoFactura: string,
    public razonSocial: string,
    public fechaFactura: Date,
    public iva: string,
    public detalle: string
  ) {}
}
