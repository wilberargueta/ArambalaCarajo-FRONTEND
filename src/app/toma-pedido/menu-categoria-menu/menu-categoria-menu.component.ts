import { CategoriaMenu } from './../../_model/categoria-menu';
import { CategoriaMenuService } from './../../_services/categoria-menu.service';
import { CategoriaService } from './../../_services/categoria.service';
import { MenuCategoriaService } from './../../_services/menu-categoria.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ac-menu-categoria-menu',
  templateUrl: './menu-categoria-menu.component.html',
  styleUrls: ['./menu-categoria-menu.component.scss']
})
export class MenuCategoriaMenuComponent implements OnInit {
  constructor(private categoriaMenuService: CategoriaMenuService) {}

  @Output()
  regresar = new EventEmitter<boolean>();

  @Output()
  categoria = new EventEmitter<number>();
  categoriasMenu: CategoriaMenu[] = [];
  categoriasTest: CategoriaMenu = new CategoriaMenu(null, null);
  ngOnInit() {
    this.categoriaMenuService.getCategoria().subscribe(data => {
      this.categoriasMenu = data;
    });
  }

  regresarFunc() {
    this.regresar.emit(true);
  }

  click(event) {
    this.categoria.emit(event);
  }
}
