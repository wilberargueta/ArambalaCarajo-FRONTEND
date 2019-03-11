import { MenuServicio } from './../../_model/menu-servicio';
import { MenuCategoria } from './../../_model/menu-categoria';
import { MenuServicioService } from './../../_services/menu-servicio.service';
import { ServicioService } from './../../_services/servicio.service';
import { MenuCategoriaService } from './../../_services/menu-categoria.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { MenuService } from './../../_services/menu.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Servicio } from '../../_model/servicio';
import { Menu } from '../../_model/menu';
import { Categoria } from '../../_model/categoria';
import { CategoriaService } from '../../_services/categoria.service';

@Component({
  selector: 'ac-perfil-menu-servicio',
  templateUrl: './perfil-menu-servicio.component.html',
  styleUrls: ['./perfil-menu-servicio.component.scss'],
  providers: [ConfirmationService]
})
export class PerfilMenuServicioComponent implements OnInit {
  constructor(
    private message: MessageService,
    private categoriaService: CategoriaService,
    private servicioService: ServicioService,
    private menuServicioService: MenuServicioService,
    private menuService: MenuService,
    private menuCategoriaService: MenuCategoriaService,
    private messageConfirmacion: ConfirmationService
  ) {}

  es: any;

  servicio: Servicio = new Servicio(null, null, null, null);
  serviciosFiltrados: Servicio[] = [];
  addServicio = false;
  categoria: Categoria;
  categorias: Categoria[];
  servicios: Menu[] = [];
  colsMenu: any[];
  menusServicio: MenuServicio[] = [];
  menusCategoria: MenuCategoria[] = [];
  menuCategoria: MenuCategoria;
  menuSelec: MenuCategoria;
  borrarMenuCategoria = false;
  iva = false;
  it = false;
  ngOnInit() {
    this.categoriaService.getCategoria().subscribe(cats => {
      this.categorias = cats;
    });
    this.categoriaService.getCategoriaByCod('CS02').subscribe(cat => {
      this.categoria = cat;
      this.menuCategoriaService
        .getMenuCategoriaByCategoria(this.categoria)
        .subscribe(r => {
          this.menusCategoria = r;
        });
    });
    this.colsMenu = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'precio', header: 'Precio' },
      { field: 'detalles', header: 'Detalle' }
    ];
  }
  filtrarServicios(event) {
    if (event.query === '') {
      this.servicioService
        .getServicio()
        .subscribe(r => (this.serviciosFiltrados = r));
    } else {
      this.servicioService
        .getServicioByNombre(event.query)
        .subscribe(r2 => (this.serviciosFiltrados = r2));
    }
  }
  openModalServicios() {
    this.servicio = new Servicio(null, null, null, null);
    this.addServicio = true;
  }
  guardarServicio() {
    this.categoria = new Categoria(null, null, null);
    this.categorias.forEach(c => {
      if (c.codCategoria === 'CS02') {
        this.categoria = c;
      }
    });
    const menu = new Menu(
      null,
      this.servicio.nombre,
      this.servicio.detalle,
      this.servicio.precio,
      this.iva,
      this.it
    );
    this.menuService.addMenu(menu).subscribe(
      m => {
        const menuservico = new MenuServicio(null, m, this.servicio, 1);
        this.menuServicioService.addMenuServicio(menuservico).subscribe(
          resultado => {
            this.message.add({
              severity: 'info',
              summary: 'Exito',
              detail: 'Menu agregado correctamente'
            });
            const categoriaMenu = new MenuCategoria(null, m, this.categoria);
            this.menuCategoriaService.addMenuCategoria(categoriaMenu).subscribe(
              result => {
                this.ngOnInit();
              },
              error => {
                this.message.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Datos erroneos, verifique los datos'
                });
              }
            );
          },
          error => {
            this.message.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Datos erroneos, verifique los datos'
            });
          }
        );
      },
      error => {
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Datos erroneos, verifique los datos'
        });
      }
    );
    this.addServicio = false;
  }

  displayBorrarMenuCategoria(event: MenuCategoria) {
    this.messageConfirmacion.confirm({
      message: 'Desea eliminar el menu?',
      accept: () => {
        this.borrarServicio(event);
      }
    });
  }
  borrarServicio(event: MenuCategoria) {
    this.menuCategoriaService.deleteMenuCategoria(event).subscribe(
      r => {
        this.menuServicioService.deleteMenuServicioByMenu(event.menu).subscribe(
          e => {
            this.menuService.deleteMenu(event.menu).subscribe(
              s => {
                this.message.add({
                  severity: 'info',
                  summary: 'Exitoso',
                  detail: 'Menu Borrado con exito'
                });
                this.ngOnInit();
              },
              error => {
                this.message.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'A sucedido un problema al intentar borrar el menu'
                });
              }
            );
          },
          error => {
            this.message.add({
              severity: 'error',
              summary: 'Error',
              detail: 'A sucedido un problema al intentar borrar el menu'
            });
          }
        );
      },
      error => {
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: 'A sucedido un problema al intentar borrar el menu'
        });
      }
    );
  }
}
