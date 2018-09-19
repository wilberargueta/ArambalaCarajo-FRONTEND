import { CategoriaProducto } from './../../_model/categoria-producto';
import { CategoriaProductoService } from './../../_services/categoria-producto.service';
import { CategoriaMenuService } from './../../_services/categoria-menu.service';
import { CategoriaMenu } from './../../_model/categoria-menu';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ac-tabla-categoria',
  templateUrl: './tabla-categoria.component.html',
  styleUrls: ['./tabla-categoria.component.scss']
})
export class TablaCategoriaComponent implements OnInit {
  items: MenuItem[];
  constructor(
    private menuServicio: CategoriaMenuService,
    private productoServicio: CategoriaProductoService
  ) {}

  menuCategorias: CategoriaMenu[];
  productoCategorias: CategoriaProducto[];
  menuCategoriaSelec: CategoriaMenu;
  productoCategoriaSelec: CategoriaProducto;
  colsMenu: any[];
  colsProducto: any[];
  ngOnInit() {
    this.menuServicio.getCategoria().subscribe(data => {
      this.menuCategorias = data;
    });
    this.productoServicio.getCategoria().subscribe(data => {
      this.productoCategorias = data;
    });
    this.colsMenu = [
      { field: 'idCategoriaMenu', header: 'ID' },
      { field: 'categoriaMenu', header: 'Categoria' }
    ];
    this.colsProducto = [
      { field: 'idCategoriaProducto', header: 'ID' },
      { field: 'categoriaProducto', header: 'Categoria' }
    ];
  }
}
