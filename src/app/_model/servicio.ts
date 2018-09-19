export class Servicio {
  constructor(
    public idServicio: number,
    public nombre: string,
    public precio: string,
    public detalle: string
  ) {}

  getIdServicio(): number {
    return this.idServicio;
  }

  setIdServicio(idServicio: number) {
    this.idServicio = idServicio;
  }

  getNombre() {
    return this.nombre;
  }

  setNombre(nombre) {
    this.nombre = nombre;
  }

  getPrecio() {
    return this.precio;
  }

  setPrecio(precio) {
    this.precio = precio;
  }

  getDetalle() {
    return this.detalle;
  }

  setDetalle(detalle) {
    this.detalle = detalle;
  }
}
