export class Receta {
  constructor(
    private idReceta: number,
    private nombre: string,
    private detalle: string
  ) {}

  getIdReceta(): number {
    return this.idReceta;
  }

  setIdReceta(idReceta: number) {
    this.idReceta = idReceta;
  }

  getNombre() {
    return this.nombre;
  }

  setNombre(nombre) {
    this.nombre = nombre;
  }

  getDetalle() {
    return this.detalle;
  }

  setDetalle(detalle) {
    this.detalle = detalle;
  }
}
