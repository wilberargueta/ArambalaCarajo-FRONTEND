import { Usuario } from './usuario';
import { Empleado } from './empleado';
export class UsuarioEmpleado {
  constructor(
    public idUsuarioEmpleado: number,
    public empleado: Empleado,
    public usuario: Usuario
  ) {}
}
