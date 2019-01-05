import { Categoria } from './../../_model/categoria';
import { MenuCabana } from './../../_model/menu-cabana';
import { MenuCabanaService } from './../../_services/menu-cabana.service';
import { MenuCategoriaService } from './../../_services/menu-categoria.service';
import { MenuService } from './../../_services/menu.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { CabanaService } from '../../_services/cabana.service';
import { MenuCategoria } from '../../_model/menu-categoria';
import { Cabana } from '../../_model/cabana';
import { Menu } from '../../_model/menu';
import { CategoriaService } from '../../_services/categoria.service';

@Component({
  selector: 'ac-perfil-menu-cabana',
  templateUrl: './perfil-menu-cabana.component.html',
  styleUrls: ['./perfil-menu-cabana.component.scss'],
  providers: [ConfirmationService]
})
export class PerfilMenuCabanaComponent implements OnInit {

  constructor(
    private message: MessageService,
    private categoriaService: CategoriaService,
    private cabanaService: CabanaService,
    private menuCabanaService: MenuCabanaService,
    private menuService: MenuService,
    private menuCategoriaService: MenuCategoriaService,
    private messageConfirmacion: ConfirmationService
  ) {}

  es: any;

  cabana: Cabana = new Cabana(null, null, null, null, null);
  cabanasFiltradas: Cabana[] = [];
  addCabana = false;
  categoria: Categoria;
  categorias: Categoria[];
  cabanas: Menu[] = [];
  colsMenu: any[];
  menusCabanas: MenuCabana[] = [];
  menusCategoria: MenuCategoria[] = [];
  menuCategoria: MenuCategoria;
  menuSelec: MenuCategoria;
  borrarMenuCategoria = false;
  ngOnInit() {
    this.categoriaService.getCategoria().subscribe(cats => {
      this.categorias = cats;
    });
    this.categoriaService.getCategoriaByCod('CC03').subscribe(cat => {
      this.categoria = cat;
      console.log(this.categoria);
      this.menuCategoriaService
        .getMenuCategoriaByCategoria(this.categoria)
        .subscribe(r => {
          console.log(r);
          this.menusCategoria = r;
        });
    });
    this.colsMenu = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'precio', header: 'Precio' },
      { field: 'detalles', header: 'Detalle' }
    ];
  }
  filtrarCabanas(event) {
    if (event.query === '') {
      this.cabanaService
        .getCabanas()
        .subscribe(c => (this.cabanasFiltradas = c));
    } else {
      this.cabanaService
        .getCabanaByNombre(event.query)
        .subscribe(c2 => (this.cabanasFiltradas = c2));
    }
  }
  openModalCabanas() {
    this.cabana = new Cabana(null, null, null, null, null);
    this.addCabana = true;
  }
  guardarCabana() {
    this.categoria = new Categoria(null, null, null);
    this.categorias.forEach(c => {
      if (c.codCategoria === 'CC03') {
        this.categoria = c;
      }
    });
    const menu = new Menu(
      null,
      this.cabana.nombre,
      this.cabana.detalle,
      this.cabana.precio
    );
    this.menuService.addMenu(menu).subscribe(
      m => {
        const menucabana = new MenuCabana(null, this.cabana, m, '2018-10-05', '2018-10-10');
        this.menuCabanaService.addMenuCabana(menucabana).subscribe(
          resultado => {
            this.message.add({
              severity: 'info',
              summary: 'Exito',
              detail: 'Cabaña agregada correctamente'
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
    this.addCabana = false;
  }

  displayBorrarMenuCategoria(event: MenuCategoria) {
    this.messageConfirmacion.confirm({
      message: 'Desea eliminar el menu?',
      accept: () => {
        this.borrarCabana(event);
      }
    });
  }
  borrarCabana(event: MenuCategoria) {
    this.menuCategoriaService.deleteMenuCategoria(event).subscribe(
      r => {
        this.menuCabanaService.deleteMenuCabanaByMenu(event.menu).subscribe(
          e => {
            this.menuService.deleteMenu(event.menu).subscribe(
              s => {
                this.message.add({
                  severity: 'info',
                  summary: 'Exitoso',
                  detail: 'Cabaña Borrado con exito'
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
