export class Producto {
  constructor(
    private codProducto: string,
    private nombre: string,
    private medida: string
  ) {}

  getCodProducto() {
  return this.codProducto;
}

  setCodProducto(codProducto) {
  this.codProducto = codProducto;
}

  getNombre() {
  return this.nombre;
}

setNombre(nombre) {
  this.nombre = nombre;
}

 getMedida() {
  return this.medida;
}

   setMedida(medida) {
  this.medida = medida;
}
}
