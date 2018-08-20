export class Proveedor {
  constructor(
    public codProveedor: string,
    public razonSocial: string,
    public nit: string,
    public telefono: string,
    public direccion: string,
    public correo: string
  ) {}

  getCodProveedor(): string {
    return this.codProveedor;
  }

  setCodProveedor(codProveedor: string): void {
    this.codProveedor = codProveedor;
  }

  getRazonSocial(): string {
    return this.razonSocial;
  }

  setRazonSocial(razonSocial: string): void {
    this.razonSocial = razonSocial;
  }

  getNit(): string {
    return this.nit;
  }

  setNit(nit: string): void {
    this.nit = nit;
  }

  getTelefono(): string {
    return this.telefono;
  }

  setTelefono(telefono: string): void {
    this.telefono = telefono;
  }

  getDireccion() {
    return this.direccion;
  }

  setDireccion(direccion: string) {
    this.direccion = direccion;
  }

  getCorreo() {
    return this.correo;
  }

  setCorreo(correo) {
    this.correo = correo;
  }
}
