import { Servicio } from './../../_model/servicio';
import { Categoria } from './../../_model/categoria';
import { CategoriaService } from './../../_services/categoria.service';
import { MenuCategoriaService } from './../../_services/menu-categoria.service';
import { MenuReceta } from './../../_model/menu-receta';
import { MenuRecetaService } from './../../_services/menu-receta.service';
import { Menu } from './../../_model/menu';
import { MenuService } from './../../_services/menu.service';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ac-tabla-menu',
  templateUrl: './tabla-menu.component.html',
  styleUrls: ['./tabla-menu.component.scss']
})
export class TablaMenuComponent implements OnInit {
  items: MenuItem[];
  constructor(
    private menuCategoriaServicio: MenuCategoriaService,
    private categoriaServicio: CategoriaService
  ) {}

  menus: Menu[] = [];
  menuSelec: Menu;
  colsMenu: any[];
  categorias: Categoria[];
  servicios: Menu[] = [];
  cabana: Menu [] = [];

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
}
