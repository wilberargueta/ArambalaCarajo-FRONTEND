import { Respuesta } from './../../_model/respuesta';
import { EmpleadoService } from './../../_services/empleado.service';
import { Role } from './../../_model/role';
import { UsuarioRoleService } from './../../_services/usuario-role.service';
import { UsuarioEmpleado } from './../../_model/usuario-empleado';
import { Message, ConfirmationService } from 'primeng/api';
import { UsuarioRole } from './../../_model/usuario-role';
import { RoleService } from './../../_services/role.service';
import { UsuarioEmpleadoService } from './../../_services/usuario-empleado.service';
import { UsuarioService } from './../../_services/usuario.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../_model/usuario';
import { Empleado } from '../../_model/empleado';

@Component({
  selector: 'ac-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
  providers: [ConfirmationService]
})
export class PerfilUsuarioComponent implements OnInit {
  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private usuarioEmpleadoService: UsuarioEmpleadoService,
    private roleService: RoleService,
    private usuarioRoleService: UsuarioRoleService,
    private confirmation: ConfirmationService,
    private empleadoService: EmpleadoService
  ) {}

  es: any;

  idUsuarioEmpleadoServicio: number;
  disable = true;
  msgs: Message[] = [];
  tipoPerfil = false;
  usuarioEmpleado = new UsuarioEmpleado(null, null, null);
  usuario = new Usuario(null, null, null);
  empleado = new Empleado(null, null, null, null, null, null, null);
  usuarioRole = new UsuarioRole(null, null, null);
  role = new Role(null, null);
  empleados: Empleado[];
  roles: Role[];
  Respuesta = new Respuesta(null, null);
  options: any[] = [
    { label: 'Si', icon: 'pi pi-check', value: true },
    { label: 'No', icon: 'pi pi-times', value: false }
  ];

  ngOnInit() {
    this.rout.params.subscribe((params: Params) => {
      if (params['id'] === 'nuevo') {
        this.usuarioEmpleado = new UsuarioEmpleado(null, null, null);
        this.tipoPerfil = false;
        this.disable = false;
      } else {
        this.tipoPerfil = true;
        this.idUsuarioEmpleadoServicio = params['id'];
        this.usuarioEmpleadoService
          .getUsuarioEmpleadoById(this.idUsuarioEmpleadoServicio)
          .subscribe(data => {
            this.usuarioEmpleado = data;
            this.empleado = this.usuarioEmpleado.empleado;
            this.usuario = this.usuarioEmpleado.usuario;
            this.usuarioRoleService
              .getUsuarioRoleByUsuario(this.usuario)
              .subscribe(role => {
                this.usuarioRole = role;
                this.role = this.usuarioRole.role;
              });
          });
      }
    });
    this.roleService.getRole().subscribe(roles => {
      this.roles = roles;
    });
  }

  regresar($event) {
    this.router.navigate(['/usuarios'], { relativeTo: this.rout });
  }
  save($event) {
    if (this.tipoPerfil) {
      // Editando un servicio
      this.usuarioRole.role = this.role;
      this.usuarioRole.usuario = this.usuario;
      this.usuarioRoleService
        .updateUsuarioRole(this.usuarioRole)
        .subscribe(rol => {
          console.log(rol);
        });
      this.usuarioEmpleado.empleado = this.empleado;
      this.usuarioEmpleado.usuario = this.usuario;
      this.usuarioEmpleadoService
        .updateUsuarioEmpleado(this.usuarioEmpleado)
        .subscribe(em => {
          console.log(em);
        });

      this.usuarioService.updateUsuario(this.usuario).subscribe(data => {
        this.Respuesta = data;
        if (this.Respuesta.valor === null) {
          this.msgs = [
            {
              severity: 'error',
              summary: 'Error',
              detail: this.Respuesta.message.message
            }
          ];

        } else {
          this.msgs = [
            {
              severity: 'info',
              summary: 'Confirmado',
              detail: this.Respuesta.message.message
            }
          ];

        }
      });
    } else {
      // Guardando un servicio
      this.usuarioService.addUsuario(this.usuario).subscribe(data => {
        this.Respuesta = data;
        console.log(this.Respuesta);
        if (this.Respuesta.valor === null) {
          this.msgs = [
            {
              severity: 'error',
              summary: 'Error',
              detail: this.Respuesta.message.message
            }
          ];

        } else {
          this.usuario = this.Respuesta.valor;
          this.msgs = [
            {
              severity: 'info',
              summary: 'Confirmado',
              detail: this.Respuesta.message.message
            }
          ];
          this.usuarioRole.role = this.role;
          this.usuarioRole.usuario = this.usuario;
          // console.log(this.usuarioRole);
          this.usuarioRoleService
            .addUsuarioRole(this.usuarioRole)
            .subscribe(rol => {
              console.log(rol);
            });
          this.usuarioEmpleado.empleado = this.empleado;
          this.usuarioEmpleado.usuario = this.usuario;
          this.usuarioEmpleadoService
            .addUsuarioEmpleado(this.usuarioEmpleado)
            .subscribe(em => {
              console.log(em);
            });
            this.tipoPerfil = true;
            this.disable = true;
        }
      });
    }
  }
  cancel($event) {
    if (this.tipoPerfil) {
      this.disable = true;
    } else {
      this.router.navigate(['/usuarios'], { relativeTo: this.rout });
    }
  }
  update($event) {
    this.disable = false;
  }
  confirm($event) {
    this.confirmation.confirm({
      message: 'Estas seguro que quieres eliminar?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete();
      }
    });
  }
  confirm2($event) {
    this.confirmation.confirm({
      message: 'Estas seguro que quieres cambiar los datos?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.save(event);
      }
    });
  }
  delete() {
    this.usuarioRole.role = this.role;
    this.usuarioRole.usuario = this.usuario;
    this.usuarioRoleService
      .deleteUsuarioRole(this.usuarioRole)
      .subscribe(rol => {
        console.log(rol);
        this.usuarioEmpleado.empleado = this.empleado;
        this.usuarioEmpleado.usuario = this.usuario;
        this.usuarioEmpleadoService
          .deleteUsuarioEmpleado(this.usuarioEmpleado)
          .subscribe(em => {
            console.log(em);
            this.usuarioService.deleteUsuario(this.usuario).subscribe(data => {
              this.msgs = [
                {
                  severity: 'info',
                  summary: 'Confirmado',
                  detail: data.message
                }
              ];
            });
          });
      });
    setTimeout(() => {
      this.router.navigate(['/usuarios'], { relativeTo: this.rout });
    }, 1000);
    console.log('Eliminado');
  }
  filtradorEmpleado(event) {
    this.empleadoService.getEmpleadoByNombre(event.query).subscribe(data => {
      this.empleados = data;
    });
  }
}
