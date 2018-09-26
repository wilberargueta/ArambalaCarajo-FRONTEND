import { MenuServicio } from './../../_model/menu-servicio';
import { MenuCategoria } from './../../_model/menu-categoria';
import { MenuServicioService } from './../../_services/menu-servicio.service';
import { ServicioService } from './../../_services/servicio.service';
import { MenuCategoriaService } from './../../_services/menu-categoria.service';
import { ConfirmationService, Message } from 'primeng/api';
import { MenuService } from './../../_services/menu.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Servicio } from '../../_model/servicio';
import { Menu } from '../../_model/menu';
import { Categoria } from '../../_model/categoria';

@Component({
  selector: 'ac-perfil-menu-servicio',
  templateUrl: './perfil-menu-servicio.component.html',
  styleUrls: ['./perfil-menu-servicio.component.scss'],
  providers: [ConfirmationService]
})
export class PerfilMenuServicioComponent implements OnInit {
  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
    private confirmation: ConfirmationService,
    private menuCategoriaService: MenuCategoriaService,
    private servicioService: ServicioService,
    private menuServicioService: MenuServicioService
  ) {}

  es: any;

  menuCategoira = new MenuCategoria(null, null, null);
  servicio = new Servicio(null, null, null, null);
  servicioListaFiltrado: Servicio[] = [];
  menuServicio = new MenuServicio(null, null, null, null);
  menuServicioTemporal = new MenuServicio(null, null, null, null);
  menuServicioLista: MenuServicio[] = [];
  mostrarServicio = true;
  mostrar = false;
  disable = true;
  msgs: Message[] = [];
  tipoPerfil = false;
  menu = new Menu(null, null, null, null);
  tipoDeEdicionDeServicio = true;
  addServicio = false;
  categoria = new Categoria(2, 'Servicios', 'CS02');
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
        this.mostrarServicio = false;
        this.menuServicio = new MenuServicio(null, null, null, null);
      } else {
        // Inicializando datos para una compra ya existente
        this.tipoPerfil = true;
        const str = params['id'];
        this.menuService.getMenuById(str).subscribe(data => {
          this.menu = data;
          this.menuServicioService
            .getMenuServicioByMenu(this.menu)
            .subscribe(val => {
              this.menuServicioLista = val;
              this.mostrarServicio = true;
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
      this.mostrarServicio = true;
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

    if (this.menuServicioLista.length > 0) {
      this.menuServicioService
        .deleteMenuServicioByMenu(this.menu)
        .subscribe(eli => {
          console.log(eli);
        });
    }
    setTimeout(() => {
      this.router.navigate(['/menus'], { relativeTo: this.rout });
    }, 1500);
  }

  openModalServicio(event) {
    // Abriendo Modal para agregar productos a la compra.
    if (event !== undefined) {
      // Modificar producto existente
      this.menuServicioTemporal = event;
      this.servicio = this.menuServicioTemporal.servicio;
      this.addServicio = true;
      this.tipoDeEdicionDeServicio = true;
    } else {
      // Agregando Nuevo producto
      this.tipoDeEdicionDeServicio = false;
      this.menuServicioTemporal = new MenuServicio(null, null, null, null);
      this.servicio = new Servicio(null, null, null, null);
      this.menuService.getMenuById(this.menu.idMenu).subscribe(data => {
        this.menuServicioTemporal.menu = data;
      });

      this.addServicio = true;
    }
  }

  addServicioToMenu(event) {
    let repetido = false;

    this.menuServicioTemporal.servicio = this.servicio;
    this.menuServicioLista.forEach(ms => {
      if (ms.servicio.idServicio === this.servicio.idServicio) {
        repetido = true;
        this.msgs = [
          {
            severity: 'error',
            summary: 'Error..',
            detail: 'El Servicio ya se encuentra agregado!!'
          }
        ];
      }
    });
    if (repetido) {
      this.addServicio = false;
    } else {
      this.addServicio = false;
      this.menuServicioService
        .addMenuServicio(this.menuServicioTemporal)
        .subscribe(data => {
          this.menuServicioLista.push(data);
        });
    }
  }
  filtradorServicio(event) {
    this.servicioService.getServicioByNombre(event.query).subscribe(data => {
      this.servicioListaFiltrado = data;
    });
  }
  eliminarMenuServicio(event) {
    this.menuServicioService.deleteMenuServicio(event).subscribe(data => {
      this.msgs = [
        {
          severity: 'info',
          summary: 'Confirmado',
          detail: data.message
        }
      ];
    });
    const index = this.menuServicioLista.indexOf(event);
    this.menuServicioLista.splice(index, 1);
    this.addServicio = false;
  }
}
