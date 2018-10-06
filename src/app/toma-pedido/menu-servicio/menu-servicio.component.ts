import { MenuCategoria } from './../../_model/menu-categoria';
import { MenuCategoriaService } from './../../_services/menu-categoria.service';
import { Menu } from './../../_model/menu';
import { MenuService } from './../../_services/menu.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CategoriaService } from '../../_services/categoria.service';
import { Categoria } from '../../_model/categoria';

@Component({
  selector: 'ac-menu-servicio',
  templateUrl: './menu-servicio.component.html',
  styleUrls: ['./menu-servicio.component.scss']
})
export class MenuServicioComponent implements OnInit {
  constructor(
    private menuCategoriaService: MenuCategoriaService,
    private categoriaService: CategoriaService
  ) {}

  @Output()
  regresar = new EventEmitter<boolean>();
  menuCat: MenuCategoria;
  menus: MenuCategoria[] = [];
  categoria: Categoria = new Categoria(null, null, null);
  @Output()
  menuSeleccionado = new EventEmitter<Menu>();

  ngOnInit() {
    this.categoriaService.getCategoriaByCod('CS02').subscribe(resul => {
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
