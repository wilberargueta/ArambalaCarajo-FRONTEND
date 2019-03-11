import { MenuCategoria } from './../../_model/menu-categoria';
import { MenuCategoriaService } from './../../_services/menu-categoria.service';
import { Receta } from './../../_model/receta';
import { MenuReceta } from './../../_model/menu-receta';
import { MenuRecetaService } from './../../_services/menu-receta.service';
import { RecetaService } from './../../_services/receta.service';
import { MenuCategoriaMenuService } from './../../_services/menu-categoria-menu.service';
import { CategoriaMenuService } from './../../_services/categoria-menu.service';
import { CategoriaMenu } from './../../_model/categoria-menu';
import { Menu } from './../../_model/menu';
import { ConfirmationService, Message } from 'primeng/api';
import { MenuService } from './../../_services/menu.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuCategoriaMenu } from '../../_model/menu-categoria-menu';
import { Categoria } from '../../_model/categoria';

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
    private menuCategoriaMenuService: MenuCategoriaMenuService,
    private recetaService: RecetaService,
    private menuRecetaService: MenuRecetaService,
    private menuCategoriaService: MenuCategoriaService
  ) {}

  es: any;
  categoriaMenu = new CategoriaMenu(null, null);
  categorias: CategoriaMenu[] = [];
  menuCategoira = new MenuCategoria(null, null, null);
  menuCategoriaMenu = new MenuCategoriaMenu(null, null, null);
  receta = new Receta(null, null, null);
  recetaListaFiltrado: Receta[] = [];
  menuReceta = new MenuReceta(null, null, null);
  menuRecetaTemporal = new MenuReceta(null, null, null);
  menuRecetaLista: MenuReceta[] = [];
  mostrarReceta = true;
  mostrar = false;
  disable = true;
  msgs: Message[] = [];
  tipoPerfil = false;
  menu = new Menu(null, null, null, null, null, null);
  tipoDeEdicionDeReceta = true;
  addReceta = false;
  categoria = new Categoria(1, 'Alimentos', 'CA01');
  options: any[] = [
    { label: 'Si', icon: 'pi pi-check', value: true },
    { label: 'No', icon: 'pi pi-times', value: false }
  ];

  ngOnInit() {
    // Inicializando Datos cuando se acceda a esta url
    this.rout.params.subscribe((params: Params) => {
      if (params['id'] === 'nuevo') {
        // Inicializando cuando se realice una nueva compra
        this.menu = new Menu(null, null, null, null, null, null);
        this.tipoPerfil = false;
        this.disable = false;
        this.mostrar = true;
        this.mostrarReceta = false;
        this.categoriaMenu = new CategoriaMenu(null, null);
        this.menuCategoriaMenu = new MenuCategoriaMenu(null, null, null);
      } else {
        // Inicializando datos para una compra ya existente
        this.categoriaMenu = new CategoriaMenu(null, null);
        this.tipoPerfil = true;
        const str = params['id'];
        this.menuService.getMenuById(str).subscribe(data => {
          this.menu = data;
          this.menuCategoriaMenuService
            .getCategoriaByMenu(this.menu)
            .subscribe(res => {
              this.menuCategoriaMenu = res;
              this.categoriaMenu = this.menuCategoriaMenu.categoriaMenu;
            });
          this.menuRecetaService
            .getMenuRecetaByMenu(this.menu)
            .subscribe(val => {
              this.menuRecetaLista = val;
              this.mostrarReceta = true;
              this.menuCategoriaService
                .getMenuCategoriaByMenuAndCategoria(this.categoria, this.menu)
                .subscribe(resultado => {
                  this.menuCategoira = resultado;
                });
            });
        });
      }
    });
  }

  regresar($event) {
    this.router.navigate(['/menus'], { relativeTo: this.rout });
  }
  saveCompra($event) {

    this.menu.it = false;
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
      this.menuCategoriaMenu.categoriaMenu = this.categoriaMenu;
      this.menuCategoriaMenu.menu = this.menu;
      this.menuCategoriaMenuService
        .updateCategoria(this.menuCategoriaMenu)
        .subscribe(data => {
          console.log(data);
        });
    } else {
      // Agregando un nuevo menu
      this.menu.it = false;

      this.menuService.addMenu(this.menu).subscribe(data => {
        this.menu = data;
        this.msgs = [
          {
            severity: 'info',
            summary: 'Confirmado',
            detail: 'Menu Agregado Correctamente ....'
          }
        ];

        this.menuCategoriaMenu.categoriaMenu = this.categoriaMenu;
        console.log(this.menuCategoriaMenu);
        this.menuCategoriaMenu.menu = this.menu;
        this.menuCategoriaMenuService
          .addCategoria(this.menuCategoriaMenu)
          .subscribe(data1 => {
            this.menuCategoriaMenu = data1;
            this.categoriaMenu = this.menuCategoriaMenu.categoriaMenu;
            const menuCategoria = new MenuCategoria(
              null,
              this.menu,
              this.categoria
            );
            this.menuCategoriaService
              .addMenuCategoria(menuCategoria)
              .subscribe(dataMC => {
                console.log(dataMC);
              });
          });
      });
      this.mostrarReceta = true;
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
    this.menuCategoriaService
      .deleteMenuCategoria(this.menuCategoira)
      .subscribe(r => {
        console.log(r);
      });

    if (this.menuRecetaLista.length > 0) {
      this.menuRecetaService
        .deleteMenuRecetaByMenu(this.menu)
        .subscribe(eli => {
          console.log(eli);
        });
    }
    console.log(this.menuCategoriaMenu);
    this.menuCategoriaMenuService
      .deleteCategoria(this.menuCategoriaMenu)
      .subscribe(re => {
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
    if (event.query === '') {
      this.categoriaMenuService
        .getCategoria()
        .subscribe(cate => (this.categorias = cate));
    } else {
      this.categoriaMenuService
        .getCategoriaByBusqueda(event.query)
        .subscribe(data => {
          this.categorias = data;
        });
    }
  }
  openModalReceta(event) {
    // Abriendo Modal para agregar productos a la compra.
    if (event !== undefined) {
      // Modificar producto existente
      this.menuRecetaTemporal = event;
      this.receta = event.receta;
      this.addReceta = true;
      this.tipoDeEdicionDeReceta = true;
    } else {
      // Agregando Nuevo producto
      this.tipoDeEdicionDeReceta = false;
      this.menuRecetaTemporal = new MenuReceta(null, null, null);
      this.receta = new Receta(null, null, null);
      this.menuService.getMenuById(this.menu.idMenu).subscribe(data => {
        this.menuRecetaTemporal.menu = data;
      });

      this.addReceta = true;
    }
  }

  addRecetaToMenu(event) {
    let repetido = false;

    this.menuRecetaTemporal.receta = this.receta;
    this.menuRecetaLista.forEach(mr => {
      if (mr.receta.idReceta === this.receta.idReceta) {
        repetido = true;
        this.msgs = [
          {
            severity: 'error',
            summary: 'Error..',
            detail: 'La Receta ya se encuentra agregada!!'
          }
        ];
      }
    });
    if (repetido) {
      this.addReceta = false;
    } else {
      this.addReceta = false;
      this.menuRecetaService
        .addMenuReceta(this.menuRecetaTemporal)
        .subscribe(data => {
          this.menuRecetaLista.push(data);
        });
    }
  }
  filtradorReceta(event) {
    if (event.query === '') {
      this.recetaService.getReceta().subscribe(data => {
        this.recetaListaFiltrado = data;
      });
    } else {
      this.recetaService.getRecetaByNombre(event.query).subscribe(data => {
        this.recetaListaFiltrado = data;
      });
    }
  }
  eliminarMenuReceta(event) {
    this.menuRecetaService.deleteMenuReceta(event).subscribe(data => {
      this.msgs = [
        {
          severity: 'info',
          summary: 'Confirmado',
          detail: data.message
        }
      ];
    });
    const index = this.menuRecetaLista.indexOf(event);
    this.menuRecetaLista.splice(index, 1);
    this.addReceta = false;
  }
}
