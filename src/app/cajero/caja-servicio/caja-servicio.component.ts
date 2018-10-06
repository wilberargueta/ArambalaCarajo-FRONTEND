import { Categoria } from './../../_model/categoria';
import { MenuCategoria } from './../../_model/menu-categoria';
import { CategoriaService } from './../../_services/categoria.service';
import { MenuCategoriaService } from './../../_services/menu-categoria.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Menu } from '../../_model/menu';

@Component({
  selector: 'ac-caja-servicio',
  templateUrl: './caja-servicio.component.html',
  styleUrls: ['./caja-servicio.component.scss']
})
export class CajaServicioComponent implements OnInit {

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
