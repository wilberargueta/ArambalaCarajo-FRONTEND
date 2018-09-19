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
    private servicio: MenuService
  ) {}

  menus: Menu[];
  menuSelec: Menu;
  cols: any[];

  ngOnInit() {
    this.servicio.getMenu().subscribe(data => {
      this.menus = data;
    });

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'precio', header: 'Precio' },
      { field: 'detalles', header: 'Detalle' },
    ];
  }




}
