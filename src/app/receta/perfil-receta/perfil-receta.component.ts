import { Producto } from './../../_model/producto';
import { ProductoService } from './../../_services/producto.service';
import { RecetaService } from './../../_services/receta.service';
import { RecetaProductoService } from './../../_services/receta-producto.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Receta } from '../../_model/receta';
import { RecetaProducto } from '../../_model/receta-producto';

@Component({
  selector: 'ac-perfil-receta',
  templateUrl: './perfil-receta.component.html',
  styleUrls: ['./perfil-receta.component.scss'],
  providers: [ConfirmationService]
})
export class PerfilRecetaComponent implements OnInit {
  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private recetaProductoServicio: RecetaProductoService,
    private confirmation: ConfirmationService,
    private recetaServicio: RecetaService,
    private productoServicio: ProductoService
  ) {}

  es: any;
  mostrar = false;
  addProducto = false;
  receta: Receta;
  productoFiltrado: Producto[];
  producto: Producto;
  disable = true;
  msgs: Message[] = [];
  tipoPerfil = false;
  recetaProductoLista: RecetaProducto[];
  recetaProducto = new RecetaProducto(null, null, null, null);
  productosTabla: Producto[];
  recetaProductoTemporal = new RecetaProducto(null, null, null, null);
  tipoDeEdicionDeProducto = true;
  options: any[] = [
    { label: 'Si', icon: 'pi pi-check', value: true },
    { label: 'No', icon: 'pi pi-times', value: false }
  ];
  desabilitarModalProductos = true;

  ngOnInit() {
    // Inicializando Datos cuando se acceda a esta url
    this.rout.params.subscribe((params: Params) => {
      if (params['id'] === 'nuevo') {
        // Inicializando cuando se realice una nueva receta
        this.receta = new Receta(null, null, null);
        this.tipoPerfil = false;
        this.disable = false;
        this.mostrar = true;
        this.recetaProductoLista = [];
        this.desabilitarModalProductos = false;
      } else {
        // Inicializando datos para una receta ya existente
        this.desabilitarModalProductos = true;
        this.tipoPerfil = true;
        const str = params['id'];
        this.recetaServicio.getRecetaById(str).subscribe(data => {
          this.receta = data;
          this.recetaProductoServicio
            .getRecetaProductoByReceta(this.receta)
            .subscribe(data1 => {
              this.recetaProductoLista = data1;
              this.recetaProducto = this.recetaProductoLista[0];
              this.mostrar = true;
            });
        });
      }
    });
  }

  regresar($event) {
    this.router.navigate(['/recetas'], { relativeTo: this.rout });
  }
  saveReceta($event) {
    if (this.tipoPerfil) {
      // Editando una receta ya existente

      this.recetaServicio.updateReceta(this.receta).subscribe(data => {
        this.msgs = [
          {
            severity: 'info',
            summary: 'Confirmado',
            detail: data.message
          }
        ];
      });
    } else {
      // Agregando una nueva receta
      this.recetaServicio.addReceta(this.receta).subscribe(data => {
        this.desabilitarModalProductos = true;
        this.receta = data;
        this.msgs = [
          {
            severity: 'info',
            summary: 'Confirmado',
            detail: 'Receta Agregada Correctamente...'
          }
        ];
      });
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
          console.log(eli);
            });
    }
    this.recetaServicio.deleteReceta(this.receta).subscribe(data => {
      this.msgs = [
        {
          severity: 'info',
          summary: 'Confirmado',
          detail: data.message
        }
      ];
    });
    setTimeout(() => {
      this.router.navigate(['/recetas'], { relativeTo: this.rout });
    }, 1500);
  }

  openModalProducto(event) {
    // Abriendo Modal para agregar productos a la compra.
    if (event !== undefined) {
      // Modificar producto existente

      this.recetaProductoTemporal = event;
      this.producto = event.producto;
      this.addProducto = true;
      this.tipoDeEdicionDeProducto = true;
    } else {
      // Agregando Nuevo producto
      this.tipoDeEdicionDeProducto = false;
      this.recetaProductoTemporal = new RecetaProducto(null, null, null, 0);
      this.producto = new Producto('', '', '');
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
        this.msgs = [
          {
            severity: 'error',
            summary: 'Error..',
            detail: 'El producto ya se encuentra agregado'
          }
        ];
      }
    });
    if (repetido) {
      this.addProducto = false;
    } else {
      this.addProducto = false;
      this.recetaProductoServicio
        .addRecetaProducto(this.recetaProductoTemporal)
        .subscribe(data => {
          this.recetaProductoLista.push(data);
        });
    }
  }
  filtradorProducto(event) {
    this.productoServicio.getProductoByNombre(event.query).subscribe(data => {
      this.productoFiltrado = data;
    });
  }
  eliminarRecetaProducto(event) {
    this.recetaProductoServicio.deleteRecetaProducto(event).subscribe(data => {
      this.msgs = [
        {
          severity: 'info',
          summary: 'Confirmado',
          detail: data.message
        }
      ];
    });
    const index = this.recetaProductoLista.indexOf(event);
    this.recetaProductoLista.splice(index, 1);
    this.addProducto = false;
  }
  editarRecetaProducto(event) {
    this.recetaProductoServicio.updateRecetaProducto(event).subscribe(data => {
      this.msgs = [
        {
          severity: 'info',
          summary: 'Confirmado',
          detail: data.message
        }
      ];
    });
    this.addProducto = false;
  }
}
