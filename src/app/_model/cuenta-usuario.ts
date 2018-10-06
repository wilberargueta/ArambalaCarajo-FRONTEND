import { Usuario } from './usuario';
import { Cuenta } from './cuenta';
export class CuentaUsuario {
  constructor(
    public idCuentaUsuario: number,
    public cuenta: Cuenta,
    public usuario: Usuario
  ) {}
}
