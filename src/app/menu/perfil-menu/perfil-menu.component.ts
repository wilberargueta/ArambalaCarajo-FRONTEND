import { MenuCategoriaMenuService } from './../../_services/menu-categoria-menu.service';
import { CategoriaMenuService } from './../../_services/categoria-menu.service';
import { CategoriaMenu } from './../../_model/categoria-menu';
import { Menu } from './../../_model/menu';
import { ConfirmationService, Message } from 'primeng/api';
import { MenuService } from './../../_services/menu.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuCategoriaMenu } from '../../_model/menu-categoria-menu';

@Component({
  selector: 'ac-perfil-menu',
  templateUrl: './perfil-menu.component.html',
  styleUrls: ['./perfil-menu.component.scss'],
  providers: [ConfirmationService]
})
export class PerfilMenuComponent implements OnInit {
  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
    private confirmation: ConfirmationService,
    private categoriaMenuService: CategoriaMenuService,
    private menuCategoriaMenuService: MenuCategoriaMenuService
  ) {}

  es: any;
  categoriaMenu = new CategoriaMenu(null, null);
  categorias: CategoriaMenu[];
  menuCategoria = new MenuCategoriaMenu(null, null, null);
  mostrar = false;
  disable = true;
  msgs: Message[] = [];
  tipoPerfil = false;
  menu = new Menu(null, null, null, null);
  tipoDeEdicionDeProducto = true;
  options: any[] = [
    { label: 'Si', icon: 'pi pi-check', value: true },
    { label: 'No', icon: 'pi pi-times', value: false }
  ];

  ngOnInit() {
    // Inicializando Datos cuando se acceda a esta url
    this.rout.params.subscribe((params: Params) => {
      if (params['id'] === 'nuevo') {
        // Inicializando cuando se realice una nueva compra
        this.menu = new Menu(null, null, null, null);
        this.tipoPerfil = false;
        this.disable = false;
        this.mostrar = true;
      } else {
        // Inicializando datos para una compra ya existente
        this.tipoPerfil = true;
        const str = params['id'];
        this.menuService.getMenuById(str).subscribe(data => {
          this.menu = data;
          this.menuCategoriaMenuService
            .getCategoriaByMenu(this.menu)
            .subscribe(res => {
              this.menuCategoria = res;
              this.categoriaMenu = this.menuCategoria.categoriaMenu;
              console.log(this.menu);
              console.log(this.menuCategoria);
              console.log(this.categoriaMenu);
            });
        });
      }
    });
  }

  regresar($event) {
    this.router.navigate(['/menus'], { relativeTo: this.rout });
  }
  saveCompra($event) {
    if (this.tipoPerfil) {
      // Editando un menu ya existente
      this.menuService.updateMenu(this.menu).subscribe(data => {
        this.msgs = [
          {
            severity: 'info',
            summary: 'Confirmado',
            detail: data.message
          }
        ];
      });
      this.menuCategoria.categoriaMenu = this.categoriaMenu;
      this.menuCategoria.menu = this.menu;
      this.menuCategoriaMenuService
        .updateCategoria(this.menuCategoria)
        .subscribe(data => {
          console.log(data);
        });
    } else {
      // Agregando un nuevo menu
      this.menuService.addMenu(this.menu).subscribe(data => {
        this.menu = data;
        this.msgs = [
          {
            severity: 'info',
            summary: 'Confirmado',
            detail: 'Menu Agregado Correctamente ....'
          }
        ];
        this.menuCategoria.categoriaMenu = this.categoriaMenu;
        this.menuCategoria.menu = this.menu;

        console.log(this.menuCategoria);
        this.menuCategoriaMenuService
          .addCategoria(this.menuCategoria)
          .subscribe(data1 => {
            this.menuCategoria = data1;
            this.categoriaMenu = this.menuCategoria.categoriaMenu;
          });
      });
    }

    this.tipoPerfil = true;
    this.disable = true;
  }
  cancel($event) {
    if (this.tipoPerfil) {
      this.disable = true;
    } else {
      this.router.navigate(['/menus'], { relativeTo: this.rout });
    }
  }
  update($event) {
    this.disable = false;
  }
  confirmEliminar($event) {
    this.confirmation.confirm({
      message: 'Estas seguro que quieres eliminar?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteCompra();
      }
    });
  }
  confirmActualizar($event) {
    this.confirmation.confirm({
      message: 'Estas seguro que quieres cambiar los datos?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.saveCompra(event);
      }
    });
  }
  deleteCompra() {
    this.menuCategoriaMenuService.deleteCategoria(this.menuCategoria).subscribe( re => {
      console.log(re);
      this.menuService.deleteMenu(this.menu).subscribe(data => {
        this.msgs = [
          {
            severity: 'info',
            summary: 'Confirmado',
            detail: data.message
          }
        ];
      });
    });

    setTimeout(() => {
      this.router.navigate(['/menus'], { relativeTo: this.rout });
    }, 1500);
  }

  filtrarCategorias(event) {
    const query = event.query;
    this.categoriaMenuService.getCategoriaByBusqueda(query).subscribe(data => {
      this.categorias = data;
    });
  }
}
