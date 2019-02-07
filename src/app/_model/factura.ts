import { TipoComprobante } from './tipo-comprobante';
export class Factura {
  constructor(
    public idFactura: number,
    public numFactura: string,
    public correlativoFactura: string,
    public razonSocial: string,
    public fechaFactura: Date,
    public iva: number,
    public detalle: string,
    public tipoComprobante: TipoComprobante
  ) {}
}
