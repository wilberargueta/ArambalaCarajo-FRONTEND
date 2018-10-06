import { MenuItem } from 'primeng/components/common/menuitem';
import { CuentaMenu } from './../../_model/cuenta-menu';
import { MenusOpciones } from './../../_model/menus-opciones';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ac-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {
  @Output()
  cambioServicio = new EventEmitter<boolean>();
  @Output()
  cambioCabanas = new EventEmitter<boolean>();
  @Output()
  cambioComidas = new EventEmitter<boolean>();
  @Output()
  cambioPrincipal = new EventEmitter<boolean>();
  @Output()
  cambioCategoriaMenu = new EventEmitter<boolean>();

  menuTest: CuentaMenu;
  menus: CuentaMenu[] = [];
  mostrar = true;
  opciones: MenusOpciones[] = [];
  items: MenuItem[];
  constructor(private rout: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.opciones.push(new MenusOpciones('Comida', 'comida', 1, false));
    this.opciones.push(new MenusOpciones('Servicios', 'servicios', 3, true));
    this.opciones.push(new MenusOpciones('Cabañas', 'cabañas', 2, true));
    this.opciones.push(new MenusOpciones('Comidas', 'comida', 4, true));
    this.items = [
      { label: '1' },
      { label: '2' },
      { label: '3' },
      { label: '4' },
      { label: '5' },
      { label: '6' },
      { label: '7' },
      { label: '8' },
      { label: '9' },
      { label: '0' }
    ];
  }

  menuServicio() {
    this.cambioServicio.emit(true);
  }
  menuComida() {
    this.cambioComidas.emit(true);
  }
  menuCabnas() {
    this.cambioCabanas.emit(true);
  }
  menuPrincipa() {
    this.cambioPrincipal.emit(true);
  }
  menuCategoriaMenu() {
    this.cambioCategoriaMenu.emit(true);
  }

  cambio(event) {
    switch (event) {
      case 0: {
        this.menuPrincipa();
        break;
      }
      case 1: {
        this.menuComida();
        break;
      }
      case 2: {
        this.menuCabnas();
        break;
      }
      case 3: {
        this.menuServicio();
        break;
      }
      case 4: {
        this.menuCategoriaMenu();
        break;
      }
    }
  }
}
