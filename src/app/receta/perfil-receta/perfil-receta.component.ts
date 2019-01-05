import { Producto } from './../../_model/producto';
import { ProductoService } from './../../_services/producto.service';
import { RecetaService } from './../../_services/receta.service';
import { RecetaProductoService } from './../../_services/receta-producto.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Receta } from '../../_model/receta';
import { RecetaProducto } from '../../_model/receta-producto';
import { MedidaProductoService } from './../../_services/medida-producto.service';
import { MedidaProducto } from '../../_model/medida-producto';
import { MessageService } from 'primeng/api';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'ac-perfil-receta',
  templateUrl: './perfil-receta.component.html',
  styleUrls: ['./perfil-receta.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class PerfilRecetaComponent implements OnInit {
  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private recetaProductoServicio: RecetaProductoService,
    private confirmation: ConfirmationService,
    private recetaServicio: RecetaService,
    private productoServicio: ProductoService,
    private medidaService: MedidaProductoService,
    private message: MessageService
  ) {}

  es: any;
  mostrar = false;
  addProducto = false;
  receta: Receta;
  productoFiltrado: Producto[];
  producto: Producto;
  disable = true;
  tipoPerfil = false;
  recetaProductoLista: RecetaProducto[];
  recetaProducto = new RecetaProducto(null, null, null, null, null);
  productosTabla: Producto[];
  recetaProductoTemporal = new RecetaProducto(null, null, null, null, null);
  tipoDeEdicionDeProducto = true;
  medidaSeleccionada: MedidaProducto;
  medidas: MedidaProducto[] = [];
  options: any[] = [
    { label: 'Si', icon: 'pi pi-check', value: true },
    { label: 'No', icon: 'pi pi-times', value: false }
  ];
  desabilitarModalProductos = true;

  ngOnInit() {
    // Inicializando Datos cuando se acceda a esta url
    this.medidaService
      .getMedidas()
      .subscribe(medidas => (this.medidas = medidas));
    this.rout.params.subscribe((params: Params) => {
      if (params['id'] === 'nuevo') {
        // Inicializando cuando se realice una nueva receta
        this.receta = new Receta(null, null, null);
        this.tipoPerfil = false;
        this.disable = false;
        this.mostrar = true;
        this.recetaProductoLista = [];
        this.desabilitarModalProductos = false;
        this.medidaSeleccionada = new MedidaProducto(null, null);
      } else {
        // Inicializando datos para una receta ya existente
        this.desabilitarModalProductos = true;
        this.tipoPerfil = true;
        const str = params['id'];
        this.recetaServicio.getRecetaById(str).subscribe(
          data => {
            this.receta = data;
            this.recetaProductoServicio
              .getRecetaProductoByReceta(this.receta)
              .subscribe(data1 => {
                this.recetaProductoLista = data1;
                // this.recetaProducto = this.recetaProductoLista[0];
                this.mostrar = true;
              });
          },
          err => {
            this.message.add({
              severity: 'error',
              summary: 'Error',
              detail: 'La receta no esta almacenada en la base de datos'
            });
            setTimeout(() => {
              this.router.navigate(['/recetas'], { relativeTo: this.rout });
            }, 2000);
          }
        );
      }
    });
  }

  regresar($event) {
    this.router.navigate(['/recetas'], { relativeTo: this.rout });
  }
  saveReceta($event) {
    if (this.tipoPerfil) {
      // Editando una receta ya existente

      this.recetaServicio.updateReceta(this.receta).subscribe(
        data => {
          this.message.add({
            severity: 'info',
            summary: 'Actualizado',
            detail: 'Actualizado con exito'
          });
        },
        erro => {
          this.message.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Datos erroneos de la receta'
          });
        }
      );
    } else {
      // Agregando una nueva receta
      this.recetaServicio.addReceta(this.receta).subscribe(
        data => {
          this.desabilitarModalProductos = true;
          this.receta = data;
          this.message.add({
            severity: 'info',
            summary: 'Actualizado',
            detail: 'Actualizado con exito'
          });
        },
        err => {
          this.message.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Datos erroneos de la receta'
          });
        }
      );
    }
    this.tipoPerfil = true;
    this.disable = true;
  }
  cancel($event) {
    if (this.tipoPerfil) {
      this.disable = true;
    } else {
      this.router.navigate(['/recetas'], { relativeTo: this.rout });
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
        this.deleteReceta();
      }
    });
  }
  confirmActualizar($event) {
    this.confirmation.confirm({
      message: 'Estas seguro que quieres cambiar los datos?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.saveReceta(event);
      }
    });
  }
  deleteReceta() {
    if (this.recetaProductoLista.length > 0) {
      this.recetaProductoServicio
        .deleteRecetaProductoByReceta(this.receta)
        .subscribe(eli => {
          this.recetaServicio.deleteReceta(this.receta).subscribe(
            data => {
              this.message.add({
                severity: 'info',
                summary: 'Eliminada',
                detail: 'Eliminada con exito'
              });
            },
            err => {
              this.message.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Datos erroneos de la receta'
              });
            }
          );
        });
    } else {
      this.recetaServicio.deleteReceta(this.receta).subscribe(
        data => {
          this.message.add({
            severity: 'info',
            summary: 'Actualizado',
            detail: 'Eliminada con exito'
          });
        },
        err => {
          this.message.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Datos erroneos de la receta'
          });
        }
      );
    }

    setTimeout(() => {
      this.router.navigate(['/recetas'], { relativeTo: this.rout });
    }, 1500);
  }

  openModalProducto(event: RecetaProducto) {
    // Abriendo Modal para agregar productos a la compra.
    if (event !== undefined) {
      // Modificar producto existente

      this.recetaProductoTemporal = event;
      this.producto = event.producto;
      this.medidaSeleccionada = this.recetaProductoTemporal.medida;
      this.addProducto = true;
      this.tipoDeEdicionDeProducto = true;
    } else {
      // Agregando Nuevo producto
      this.tipoDeEdicionDeProducto = false;
      this.recetaProductoTemporal = new RecetaProducto(
        null,
        null,
        null,
        null,
        null
      );
      this.producto = new Producto(null, null, null);
      this.medidaSeleccionada = new MedidaProducto(null, null);
      this.recetaProductoTemporal.receta = this.receta;
      this.addProducto = true;
    }
  }

  addProductoToReceta(event) {
    let repetido = false;

    this.recetaProductoTemporal.producto = this.producto;
    this.recetaProductoLista.forEach(cpC => {
      if (cpC.producto.codProducto === this.producto.codProducto) {
        repetido = true;
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: 'El producto ya se encuentra agregado'
        });
      }
    });
    if (repetido) {
      this.addProducto = false;
    } else {
      this.addProducto = false;
      this.recetaProductoTemporal.medida = this.medidaSeleccionada;
      this.recetaProductoServicio
        .addRecetaProducto(this.recetaProductoTemporal)
        .subscribe(
          data => {
            this.recetaProductoServicio
              .getRecetaProductoByReceta(this.recetaProductoTemporal.receta)
              .subscribe(
                recetas => {
                  this.recetaProductoLista = [];
                  this.recetaProductoLista = recetas;
                },
                err => {
                  this.message.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al cargar los datos'
                  });
                }
              );
          },
          err => {
            this.message.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'Error al agregar el producto a la receta, revice los datos'
            });
          }
        );
    }
  }
  filtradorProducto(event) {
    if (event.query === '') {
      this.productoServicio
        .getProducto()
        .subscribe(prod => (this.productoFiltrado = prod));
    } else {
      this.productoServicio.getProductoByNombre(event.query).subscribe(data => {
        this.productoFiltrado = data;
      });
    }
  }
  eliminarRecetaProducto(event) {
    this.recetaProductoServicio.deleteRecetaProducto(event).subscribe(
      data => {
        this.recetaProductoServicio
          .getRecetaProductoByReceta(this.recetaProductoTemporal.receta)
          .subscribe(
            recetas => {
              this.recetaProductoLista = [];
              this.recetaProductoLista = recetas;
            },
            err => {
              this.message.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al cargar los datos'
              });
            }
          );
        this.message.add({
          severity: 'info',
          summary: 'Exitoso',
          detail: 'Producto eliminado de la lista'
        });
      },
      err => {
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al eliminar el producto de la receta, revice los datos'
        });
      }
    );
    this.addProducto = false;
  }
  editarRecetaProducto(event) {
    this.recetaProductoServicio.updateRecetaProducto(event).subscribe(
      data => {
        this.message.add({
          severity: 'info',
          summary: 'Exitoso',
          detail: 'Producto actualizada de la lista'
        });
      },
      err => {
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al editar el producto de la receta, revice los datos'
        });
      }
    );
    this.addProducto = false;
  }
}
