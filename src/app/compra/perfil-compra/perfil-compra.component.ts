import { ProductoService } from './../../_services/producto.service';
import { DateConvert } from './../../_class/date-convert';
import { Proveedor } from './../../_model/proveedor';
import { ProveedorService } from './../../_services/proveedor.service';
import { CompraProducto } from './../../_model/compra-producto';
import { CompraProductoService } from './../../_services/compra-producto.service';
import { Compra } from './../../_model/compra';
import { ConfirmationService, Message } from 'primeng/api';
import { CompraService } from './../../_services/compra.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../_model/producto';


@Component({
  selector: 'ac-perfil-compra',
  templateUrl: './perfil-compra.component.html',
  styleUrls: ['./perfil-compra.component.scss'],
  providers: [ConfirmationService]
})
export class PerfilCompraComponent implements OnInit {
  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private compraProductoServicio: CompraProductoService,
    private confirmation: ConfirmationService,
    private proveedorServicio: ProveedorService,
    private compraServicio: CompraService,
    private fecha: DateConvert,
    private productoServicio: ProductoService
  ) {}

  es: any;
  fechaCompra: string;
  mostrar = false;
  addProducto = false;
  compra: Compra;
  proveedor: Proveedor;
  proveedorFiltrado: Proveedor[];
  productoFiltrado: Producto[];
  producto: Producto;
  disable = true;
  msgs: Message[] = [];
  tipoPerfil = false;
  compraProductoLista: CompraProducto[];
  compraProducto = new CompraProducto('', null, null, null);
  productosTabla: Producto[];
  compraProductoTemporal = new CompraProducto('', null, null, null);
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
        // Inicializando cuando se realice una nueva compra
        this.compra = new Compra(null, '', null, '', null);
        this.tipoPerfil = false;
        this.disable = false;
        this.mostrar = true;
        this.proveedor = new Proveedor('', '', '', '', '', '');
        this.compraProductoLista = [];
        this.desabilitarModalProductos = false;
      } else {
        // Inicializando datos para una compra ya existente
        this.desabilitarModalProductos = true;
        this.tipoPerfil = true;
        const str = params['id'];
        this.compraServicio.getComprasByRC(str).subscribe(data => {
          this.compra = data;

          this.compraProductoServicio
            .getCompraProductoByCompra(this.compra)
            .subscribe(data1 => {
              this.compraProductoLista = data1;
              this.compraProducto = this.compraProductoLista[0];
              this.fechaCompra = this.fecha.convertToString(
                this.compra.fechaCompra
              );
              this.mostrar = true;
              this.proveedor = this.compra.proveedor;
            });
        });
      }
    });
  }

  regresar($event) {
    this.router.navigate(['/compras'], { relativeTo: this.rout });
  }
  saveCompra($event) {
    this.compra.fechaCompra = this.fechaCompra;
    if (this.tipoPerfil) {
      // Editando una compra ya existente
      this.compra.proveedor = this.proveedor;
      this.compraServicio.updateCompra(this.compra).subscribe(data => {
        this.msgs = [
          {
            severity: 'info',
            summary: 'Confirmado',
            detail: data.message
          }
        ];
      });
    } else {
      // Agregando una nueva compra
      this.compra.proveedor = this.proveedor;
      this.compraServicio.addCompra(this.compra).subscribe(data => {
        this.desabilitarModalProductos = true;
        this.compra = data;
        this.msgs = [
          {
            severity: 'info',
            summary: 'Confirmado',
            detail: 'Compra Ingresada Correctamente'
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
      this.router.navigate(['/compras'], { relativeTo: this.rout });
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
    if (this.compraProductoLista.length > 0) {
      this.compraProductoServicio
        .deleteCompraProductoByCompra(this.compra)
        .subscribe(eli => {
          console.log(eli);
        });
    }
    this.compraServicio.deleteCompra(this.compra).subscribe(data => {
      this.msgs = [
        {
          severity: 'info',
          summary: 'Confirmado',
          detail: data.message
        }
      ];
    });
    setTimeout(() => {
      this.router.navigate(['/compras'], { relativeTo: this.rout });
    }, 1500);
  }

  filtradorProveedor(event) {
    this.proveedorServicio
      .getProveedoresByPrefix(event.query)
      .subscribe(data => {
        this.proveedorFiltrado = data;
      });
  }
  openModalProducto(event) {
    // Abriendo Modal para agregar productos a la compra.
    if (event !== undefined) {
      // Modificar producto existente
      this.compraProductoTemporal = event;
      this.producto = event.productos;
      this.addProducto = true;
      this.tipoDeEdicionDeProducto = true;
    } else {
      // Agregando Nuevo producto
      this.tipoDeEdicionDeProducto = false;
      this.compraProductoTemporal = new CompraProducto('', null, null, 0);
      this.producto = new Producto('', '', '');
      this.compraServicio
        .getComprasByRC(this.compra.registroCompra)
        .subscribe(data => {
          this.compraProductoTemporal.compras = data;
        });

      this.addProducto = true;
    }
  }

  addProductoToCompra(event) {
    let repetido = false;

    this.compraProductoTemporal.productos = this.producto;
    this.compraProductoLista.forEach(cpC => {
      if (cpC.productos.codProducto === this.producto.codProducto) {
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
      this.compraProductoServicio
        .addCompraProducto(this.compraProductoTemporal)
        .subscribe(data => {
          this.compraProductoLista.push(data);
        });
    }
  }
  filtradorProducto(event) {
    this.productoServicio.getProductoByNombre(event.query).subscribe(data => {
      this.productoFiltrado = data;
    });
  }
  eliminarCompraProducto(event) {
    this.compraProductoServicio.deleteCompraProducto(event).subscribe(data => {
      this.msgs = [
        {
          severity: 'info',
          summary: 'Confirmado',
          detail: data.message
        }
      ];
    });
    const index = this.compraProductoLista.indexOf(event);
    this.compraProductoLista.splice(index, 1);
    this.addProducto = false;
  }
  editarCompraProducto(event) {
    this.compraProductoServicio.updateCompraProducto(event).subscribe(data => {
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
