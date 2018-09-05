export class Producto {
  constructor(
    public codProducto: string,
    public nombre: string,
    public medida: string
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
