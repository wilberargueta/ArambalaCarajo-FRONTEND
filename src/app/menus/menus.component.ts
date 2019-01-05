import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioRoleService } from './../_services/usuario-role.service';
import { UsuarioEmpleadoService } from './../_services/usuario-empleado.service';
import { UsuarioService } from './../_services/usuario.service';
import { LoginParamService } from './../_services/login-param.service';
import { UsuarioRole } from './../_model/usuario-role';
import { UsuarioEmpleado } from './../_model/usuario-empleado';
import { Usuario } from './../_model/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ac-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {
  items: MenuItem[];
  itemsPerfil: MenuItem[];
  display;
  helper = new JwtHelperService();
  nombreUsuario = null;
  nombreCompleto = null;
  usuario: Usuario = new Usuario(null, null, null);
  usuarioEmpleado: UsuarioEmpleado = new UsuarioEmpleado(null, null, null);
  usuarioRole: UsuarioRole = new UsuarioRole(null, null, null);
  session = false;
  constructor(
    private usuarioService: UsuarioService,
    private usuarioEmpleadoService: UsuarioEmpleadoService,
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
              this.itemsPerfil = [];
              switch (
                this.helper.decodeToken(sessionStorage.getItem('token')).role
              ) {
                case '[Administrador]':
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
                      label: 'Inventario',
                      items: [
                        {
                          label: 'Productos',
                          icon: 'pi pi-calendar-plus',
                          routerLink: ['productos']
                        },
                        {
                          label: 'Compras',
                          icon: 'pi pi-arrow-circle-right',
                          routerLink: ['compras']
                        },
                        {
                          label: 'Proveedores',
                          icon: 'pi pi-users',
                          routerLink: ['proveedores']
                        },
                        {
                          label: 'Existencias',
                          icon: 'pi pi-home',
                          routerLink: ['existencias']
                        }
                      ]
                    },
                    {
                      label: 'Menus',
                      items: [
                        {
                          label: 'Lista de Menus',
                          icon: 'pi pi-bars',
                          routerLink: ['menus']
                        },
                        {
                          label: 'Servicios',
                          icon: 'pi pi-circle-on',
                          routerLink: ['servicios']
                        },
                        {
                          label: 'Cabañas',
                          icon: 'pi pi-home',
                          routerLink: ['cabañas']
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
                        }
                      ]
                    },

                    {
                      label: 'Usuarios',
                      routerLink: ['/usuarios'],
                      items: [
                        {
                          label: 'Nuevo',
                          icon: 'pi pi-plus',
                          routerLink: ['/usuarios/nuevo']
                        }
                      ]
                    },

                    {
                      label: 'Ventas',
                      icon: 'pi pi-calendar',
                      routerLink: ['ventas']
                    },
                    {
                      label: 'Salir',
                      icon: 'pi pi-times-circle',
                      routerLink: ['logout']
                    },

                  ];
                  break;
                case '[Cajero]':
                  this.items = [
                    {
                      label: 'Caja',
                      icon: 'pi pi-inbox',
                      routerLink: ['/cajero']
                    },
                    {
                      label: 'Salir',
                      icon: 'pi pi-times-circle',
                      routerLink: ['logout']
                    }
                  ];
                  break;
                case '[Toma Pedido]':
                  this.items = [
                    {
                      label: 'Toma Pedido',
                      icon: 'pi pi-info',
                      routerLink: ['/tomapedido']
                    },
                    {
                      label: 'Salir',
                      icon: 'pi pi-times-circle',
                      routerLink: ['logout']
                    }
                  ];
                  break;
              }

              this.session = true;

              this.router.navigate(['home']);
            });
        });
    } else if (sessionStorage.getItem('token') === null) {
      this.session = false;
      this.nombreUsuario = null;
      this.nombreCompleto = null;
      this.usuario = new Usuario(null, null, null);
      this.usuarioEmpleado = new UsuarioEmpleado(null, null, null);
      this.usuarioRole = new UsuarioRole(null, null, null);

      this.router.navigate(['login']);

      // this.sesion.sessionActiva = false;
    }
  }
}
