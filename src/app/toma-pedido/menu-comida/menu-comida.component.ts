import { MenuCategoriaMenu } from './../../_model/menu-categoria-menu';
import { CategoriaMenu } from './../../_model/categoria-menu';
import { CategoriaMenuService } from './../../_services/categoria-menu.service';
import { MenuCategoriaMenuService } from './../../_services/menu-categoria-menu.service';
import { Categoria } from './../../_model/categoria';
import { MenuCategoria } from './../../_model/menu-categoria';
import { CategoriaService } from './../../_services/categoria.service';
import { MenuCategoriaService } from './../../_services/menu-categoria.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Menu } from '../../_model/menu';

@Component({
  selector: 'ac-menu-comida',
  templateUrl: './menu-comida.component.html',
  styleUrls: ['./menu-comida.component.scss']
})
export class MenuComidaComponent implements OnInit {
  constructor(
    private menuCategoriaService: MenuCategoriaMenuService,
    private categoriaService: CategoriaMenuService
  ) {}

  @Output()
  regresar = new EventEmitter<boolean>();

  @Input()
  idCategoriaMenu: number;

  @Output()
  menuSeleccionado = new EventEmitter<Menu>();
  menuCat: MenuCategoria;
  menus: MenuCategoriaMenu[] = [];
  categoria: Categoria = new Categoria(null, null, null);
  menuCategoria: CategoriaMenu = new CategoriaMenu(null, null);
  ngOnInit() {
    this.categoriaService
      .getCategoriaById(this.idCategoriaMenu)
      .subscribe(data => {
        this.menuCategoria = data;
        this.menuCategoriaService
          .getCategoriaByCategoriaMenu(this.menuCategoria)
          .subscribe(result => {
            this.menus = result;
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
