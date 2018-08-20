export class Servicio {
  constructor(
    private idServicio: number,
    private nombre: string,
    private precio: string,
    private detalle: string
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
