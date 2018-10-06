import { CategoriaService } from './../../_services/categoria.service';
import { MenuCategoriaService } from './../../_services/menu-categoria.service';
import { Categoria } from './../../_model/categoria';
import { MenuCategoria } from './../../_model/menu-categoria';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Menu } from '../../_model/menu';

@Component({
  selector: 'ac-menu-cabana',
  templateUrl: './menu-cabana.component.html',
  styleUrls: ['./menu-cabana.component.scss']
})
export class MenuCabanaComponent implements OnInit {
  constructor(
    private menuCategoriaService: MenuCategoriaService,
    private categoriaService: CategoriaService
  ) {}

  @Output()
  regresar = new EventEmitter<boolean>();

  @Output()
  menuSeleccionado = new EventEmitter<Menu>();

  menuCat: MenuCategoria;
  menus: MenuCategoria[] = [];
  categoria: Categoria = new Categoria(null, null, null);
  ngOnInit() {
    this.categoriaService.getCategoriaByCod('CC03').subscribe(resul => {
      this.categoria = resul;
      this.menuCategoriaService
        .getMenuCategoriaByCategoria(this.categoria)
        .subscribe(data => {
          this.menus = data;
        });
    });
  }

  regresarFunc() {
    this.regresar.emit(true);
  }

  select(event) {
    this.menuSeleccionado.emit(event);
    this.regresar.emit(true);
  }
}
