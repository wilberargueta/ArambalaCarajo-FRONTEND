export class Empleado {
  constructor(
    public codEmpleado: string,
    public nombre: string,
    public apellido: string,
    public dui: string,
    public telefono: string,
    public fechaNacimiento: string,
    public direccion: string
  ) {}

  getCodEmpleado(): string {
    return this.codEmpleado;
  }

  setCodEmpleado(codEmpleado: string): void {
    this.codEmpleado = codEmpleado;
  }

  getNombre(): string {
    return this.nombre;
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  getApellido(): string {
    return this.apellido;
  }

  setApellido(apellido: string) {
    this.apellido = apellido;
  }

  getDui(): string {
    return this.dui;
  }

  setDui(dui: string): void {
    this.dui = dui;
  }

  getFechaNacimiento(): string {
    return this.fechaNacimiento;
  }

  setFechaNacimiento(fechaNacimiento: string): void {
    this.fechaNacimiento = fechaNacimiento;
  }

  getDireccion(): string {
    return this.direccion;
  }

  setDireccion(direccion: string): void {
    this.direccion = direccion;
  }

  getTelefono(): string {
    return this.telefono;
  }

  setTelefono(telefono: string): void {
    this.telefono = telefono;
  }
}
