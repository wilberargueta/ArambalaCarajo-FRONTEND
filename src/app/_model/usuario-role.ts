import { Usuario } from './usuario';
import { Role } from './role';
export class UsuarioRole {
  constructor(
    public idUsuarioRole: number,
    public role: Role,
    public usuario: Usuario
  ) {}
}
