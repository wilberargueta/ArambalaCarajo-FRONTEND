export class Menu {
  constructor(
    public idMenu: number,
    public nombre: string,
    public detalles: string,
    public precio: string
  ) {}

  getIdMenu(): number {
    return this.idMenu;
  }

  setIdMenu(idMenu: number) {
    this.idMenu = idMenu;
  }

  getNombre() {
    return this.nombre;
  }

  setNombre(nombre) {
    this.nombre = nombre;
  }

  getDetalles() {
    return this.detalles;
  }

  setDetalles(detalles) {
    this.detalles = detalles;
  }

  getPrecio() {
    return this.precio;
  }

  setPrecio(precio) {
    this.precio = precio;
  }
}
