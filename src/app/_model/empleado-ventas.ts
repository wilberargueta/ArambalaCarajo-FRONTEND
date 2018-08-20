import { Empleado } from './empleado';
import { Venta } from './venta';

export class EmpleadoVentas {

  constructor(
    private idEmpleadoVenta: number,
    private venta: Venta,
    private empleado: Empleado
  ) {}

  getIdEmpleadoVenta() {
    return this.idEmpleadoVenta;
  }

  setIdEmpleadoVenta(idEmpleadoVenta) {
    this.idEmpleadoVenta = idEmpleadoVenta;
  }

  getVenta(): Venta {
    return this.venta;
  }

  setVenta(venta: Venta) {
    this.venta = venta;
  }

  getEmpleado(): Empleado {
    return this.empleado;
  }

  setEmpleado(empleado: Empleado) {
    this.empleado = empleado;
  }
}
