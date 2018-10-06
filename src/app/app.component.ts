import { Router } from '@angular/router';
import { UsuarioRole } from './_model/usuario-role';
import { UsuarioEmpleado } from './_model/usuario-empleado';
import { Usuario } from './_model/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioRoleService } from './_services/usuario-role.service';
import { UsuarioEmpleadoService } from './_services/usuario-empleado.service';
import { UsuarioService } from './_services/usuario.service';
import { LoginParamService } from './_services/login-param.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoginParamService]
})
export class AppComponent implements OnInit {
  items: MenuItem[];
  itemsPerfil: MenuItem[];
  display;
  helper = new JwtHelperService();
  nombreUsuario;
  nombreCompleto;
  usuario: Usuario = new Usuario(null, null, null);
  usuarioEmpleado: UsuarioEmpleado = new UsuarioEmpleado(null, null, null);
  usuarioRole: UsuarioRole = new UsuarioRole(null, null, null);
  constructor(
    public sesion: LoginParamService,
    private usuarioService: UsuarioService,
    private usuarioEmpleadoService: UsuarioEmpleadoService,
    private usuarioRoleService: UsuarioRoleService,
    private router: Router
  ) {}
  ngOnInit() {
    this.nombreUsuario = null;
    this.nombreCompleto = null;

    this.usuarioEmpleado = new UsuarioEmpleado(null, null, null);
    this.usuarioRole = new UsuarioRole(null, null, null);

    if (sessionStorage.getItem('token') !== null) {
      this.nombreUsuario = this.helper.decodeToken(
        sessionStorage.getItem('token')
      ).sub;
      this.usuarioService
        .getUsuarioByOneNick(this.nombreUsuario)
        .subscribe(u => {
          this.usuario = u;
          this.usuarioEmpleadoService
            .getUsuarioEmpleadoByUsuario(this.usuario)
            .subscribe(ue => {
              this.usuarioEmpleado = ue;
              this.nombreCompleto = `${this.usuarioEmpleado.empleado.nombre} ${
                this.usuarioEmpleado.empleado.apellido
              }`;
              this.itemsPerfil = [
                {
                  label: 'Salir',
                  routerLink: ['logout']
                }
              ];
              this.items = [
                {
                  label: 'Inicio',
                  icon: 'pi pi-circle-off',
                  routerLink: ['home']
                },

                {
                  label: 'Empleado',
                  icon: 'pi pi-user',
                  routerLink: ['empleados'],
                  items: [
                    {
                      label: 'Nuevo',
                      icon: 'pi pi-plus',
                      routerLink: ['empleados/nuevo']
                    }
                  ]
                },
                {
                  label: 'Proveedores',
                  icon: 'pi pi-users',
                  routerLink: ['proveedores']
                },
                {
                  label: 'Cabañas',
                  icon: 'pi pi-home',
                  routerLink: ['cabañas']
                },
                {
                  label: 'Compras',
                  icon: 'pi pi-arrow-circle-right',
                  routerLink: ['compras']
                },
                {
                  label: 'Productos',
                  icon: 'pi pi-calendar-plus',
                  routerLink: ['productos']
                },
                {
                  label: 'Recetas',
                  icon: 'pi pi-pencil',
                  routerLink: ['recetas']
                },
                {
                  label: 'Categorias',
                  icon: 'pi pi-align-justify',
                  routerLink: ['categorias']
                },
                {
                  label: 'Menus',
                  icon: 'pi pi-align-right',
                  routerLink: ['menus']
                },
                {
                  label: 'Servicios',
                  icon: 'pi pi-circle-on',
                  routerLink: ['servicios']
                },
                {
                  label: 'Usuarios',
                  icon: 'pi pi-info',
                  routerLink: ['/usuarios']
                },
                {
                  label: 'Toma Pedido',
                  icon: 'pi pi-info',
                  routerLink: ['/tomapedido']
                },
                {
                  label: 'Caja',
                  icon: 'pi pi-inbox',
                  routerLink: ['/cajero']
                },
                {
                  label: 'Caja',
                  icon: 'pi pi-inbox',
                  routerLink: ['/cajero']
                }
              ];
            });
          this.usuarioRoleService
            .getUsuarioRoleByUsuario(this.usuario)
            .subscribe(ur => {
              this.usuarioRole = ur;
            });
        });
        this.sesion.sessionActiva = true;
      this.router.navigate(['home']);
    } else if (!this.sesion.sessionActiva) {

      this.nombreUsuario = null;
      this.nombreCompleto = null;
      this.usuario = new Usuario(null, null, null);
      this.usuarioEmpleado = new UsuarioEmpleado(null, null, null);
      this.usuarioRole = new UsuarioRole(null, null, null);
      // this.sesion.sessionActiva = false;
    }
  }
}
