import { Categoria } from './../../_model/categoria';
import { MenuCabana } from './../../_model/menu-cabana';
import { MenuCabanaService } from './../../_services/menu-cabana.service';
import { MenuCategoriaService } from './../../_services/menu-categoria.service';
import { MenuService } from './../../_services/menu.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { CabanaService } from '../../_services/cabana.service';
import { MenuCategoria } from '../../_model/menu-categoria';
import { Cabana } from '../../_model/cabana';
import { Menu } from '../../_model/menu';

@Component({
  selector: 'ac-perfil-menu-cabana',
  templateUrl: './perfil-menu-cabana.component.html',
  styleUrls: ['./perfil-menu-cabana.component.scss'],
  providers: [ConfirmationService]
})
export class PerfilMenuCabanaComponent implements OnInit {

  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
    private confirmation: ConfirmationService,
    private menuCategoriaService: MenuCategoriaService,
    private cabanaService: CabanaService,
    private menuCabanaService: MenuCabanaService
  ) {}

  es: any;

  menuCategoira = new MenuCategoria(null, null, null);
  cabana = new Cabana(null, null, null, null, null);
  cabanaListaFiltrado: Cabana[] = [];
  menuCabana = new MenuCabana(null, null, null, null, null);
  menuCabanaTemporal = new MenuCabana(null, null, null, null, null);
  menuCabanaLista: MenuCabana[] = [];
  mostrarCabana = true;
  mostrar = false;
  disable = true;
  msgs: Message[] = [];
  tipoPerfil = false;
  menu = new Menu(null, null, null, null);
  tipoDeEdicionDeCabana = true;
  addCabana = false;
  categoria = new Categoria(3, 'Cabañas', 'CC03');
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
        this.mostrarCabana = false;
        this.menuCabana = new MenuCabana(null, null, null, null, null);
      } else {
        // Inicializando datos para una compra ya existente
        this.tipoPerfil = true;
        const str = params['id'];
        this.menuService.getMenuById(str).subscribe(data => {
          this.menu = data;
          this.menuCabanaService
            .getMenuCabanaByMenu(this.menu)
            .subscribe(val => {
              this.menuCabanaLista = val;
              this.mostrarCabana = true;
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
      this.mostrarCabana = true;
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

    if (this.menuCabanaLista.length > 0) {
      this.menuCabanaService
        .deleteMenuCabanaByMenu(this.menu)
        .subscribe(eli => {
          console.log(eli);
        });
    }
    setTimeout(() => {
      this.router.navigate(['/menus'], { relativeTo: this.rout });
    }, 1500);
  }

  openModalCabana(event) {
    // Abriendo Modal para agregar productos a la compra.
    if (event !== undefined) {
      // Modificar producto existente
      this.menuCabanaTemporal = event;
      this.cabana = this.menuCabanaTemporal.cabana;
      this.addCabana = true;
      this.tipoDeEdicionDeCabana = true;
    } else {
      // Agregando Nuevo producto
      this.tipoDeEdicionDeCabana = false;
      this.menuCabanaTemporal = new MenuCabana(null, null, null, null, null);
      this.cabana = new Cabana(null, null, null, null, null);
      this.menuService.getMenuById(this.menu.idMenu).subscribe(data => {
        this.menuCabanaTemporal.menu = data;
      });

      this.addCabana = true;
    }
  }

  addCabanaToMenu(event) {
    let repetido = false;

    this.menuCabanaTemporal.cabana = this.cabana;
    this.menuCabanaLista.forEach(ms => {
      if (ms.cabana.codCabana === this.cabana.codCabana) {
        repetido = true;
        this.msgs = [
          {
            severity: 'error',
            summary: 'Error..',
            detail: 'La Cabaña ya se encuentra agregada!!'
          }
        ];
      }
    });
    if (repetido) {
      this.addCabana = false;
    } else {
      this.addCabana = false;
      console.log(this.menuCabanaTemporal);
      this.menuCabanaService
        .addMenuCabana(this.menuCabanaTemporal)
        .subscribe(data => {
          this.menuCabanaLista.push(data);
        });
    }
  }
  filtradorCabana(event) {
    this.cabanaService.getCabanaByNombre(event.query).subscribe(data => {
      this.cabanaListaFiltrado = data;
    });
  }
  eliminarMenuCabana(event) {
    this.menuCabanaService.deleteMenuCabana(event).subscribe(data => {
      this.msgs = [
        {
          severity: 'info',
          summary: 'Confirmado',
          detail: data.message
        }
      ];
    });
    const index = this.menuCabanaLista.indexOf(event);
    this.menuCabanaLista.splice(index, 1);
    this.addCabana = false;
  }

}
