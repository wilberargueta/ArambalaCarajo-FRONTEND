import { Servicio } from './../../_model/servicio';
import { Categoria } from './../../_model/categoria';
import { CategoriaService } from './../../_services/categoria.service';
import { MenuCategoriaService } from './../../_services/menu-categoria.service';
import { MenuReceta } from './../../_model/menu-receta';
import { MenuRecetaService } from './../../_services/menu-receta.service';
import { Menu } from './../../_model/menu';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../_services/servicio.service';
import { MenuServicioService } from '../../_services/menu-servicio.service';
import { MenuService } from '../../_services/menu.service';
import { MenuServicio } from '../../_model/menu-servicio';
import { MessageService } from 'primeng/api';
import { MenuCategoriaMenuService } from '../../_services/menu-categoria-menu.service';
import { CategoriaMenu } from '../../_model/categoria-menu';
import { MenuCategoriaMenu } from '../../_model/menu-categoria-menu';
import { MenuCategoria } from '../../_model/menu-categoria';

@Component({
  selector: 'ac-tabla-menu',
  templateUrl: './tabla-menu.component.html',
  styleUrls: ['./tabla-menu.component.scss'],
  providers: [MessageService]
})
export class TablaMenuComponent implements OnInit {
  items: MenuItem[];
  constructor(
    private message: MessageService,
    private menuCategoriaServicio: MenuCategoriaService,
    private categoriaServicio: CategoriaService,
    private servicioService: ServicioService,
    private menuServicioService: MenuServicioService,
    private menuServicio: MenuService,
    private menuCategoriaService: MenuCategoriaService
  ) {}

  menus: Menu[] = [];
  menuSelec: Menu;
  colsMenu: any[];
  categorias: Categoria[];
  servicios: Menu[] = [];
  cabana: Menu[] = [];
  servicio: Servicio = new Servicio(null, null, null, null);
  serviciosFiltrados: Servicio[] = [];
  addServicio = false;
  categoria: Categoria;
  ngOnInit() {
    this.categoriaServicio.getCategoria().subscribe(cdata => {
      this.categorias = cdata;
      this.menuCategoriaServicio
        .getMenuCategoriaByCategoria(this.categorias[0])
        .subscribe(data => {
          data.forEach(m => {
            this.menus.push(m.menu);
          });
        });
    });
    this.categoriaServicio.getCategoria().subscribe(cdata => {
      this.categorias = cdata;
      this.menuCategoriaServicio
        .getMenuCategoriaByCategoria(this.categorias[1])
        .subscribe(data => {
          data.forEach(m => {
            this.servicios.push(m.menu);
          });
        });
    });
    this.categoriaServicio.getCategoria().subscribe(cdata => {
      this.categorias = cdata;
      this.menuCategoriaServicio
        .getMenuCategoriaByCategoria(this.categorias[2])
        .subscribe(data => {
          data.forEach(m => {
            this.cabana.push(m.menu);
          });
        });
    });
    this.colsMenu = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'precio', header: 'Precio' },
      { field: 'detalles', header: 'Detalle' }
    ];
  }
  filtrarServicios(event) {
    this.servicioService
      .getServicioByNombre(event.query)
      .subscribe(servicios => (this.serviciosFiltrados = servicios));
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
      this.servicio.precio
    );
    this.menuServicio.addMenu(menu).subscribe(
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
              result => {},
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
}
