import { CategoriaMenu } from './../../_model/categoria-menu';
import { Categoria } from './../../_model/categoria';
import { MenuCategoriaMenu } from './../../_model/menu-categoria-menu';
import { MenuCategoria } from './../../_model/menu-categoria';
import { Menu } from './../../_model/menu';
import { CategoriaMenuService } from './../../_services/categoria-menu.service';
import { MenuCategoriaMenuService } from './../../_services/menu-categoria-menu.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ac-caja-comida',
  templateUrl: './caja-comida.component.html',
  styleUrls: ['./caja-comida.component.scss']
})
export class CajaComidaComponent implements OnInit {

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
