import { ConfirmationService, Message, SelectItem } from 'primeng/api';
import { ProductoService } from './../../_services/producto.service';
import { MedidaProductoService } from '../../_services/medida-producto.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../_model/producto';
import { MedidaProducto } from '../../_model/medida-producto';
import { ExistenciaService } from '../../_services/existencia.service';
import { Existencia } from '../../_model/existencia';

@Component({
  selector: 'ac-perfil-producto',
  templateUrl: './perfil-producto.component.html',
  styleUrls: ['./perfil-producto.component.scss'],
  providers: [ConfirmationService]
})
export class PerfilProductoComponent implements OnInit {
  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private servicio: ProductoService,
    private confirmation: ConfirmationService,
    private medidasService: MedidaProductoService,
    private existenciaService: ExistenciaService
  ) {}

  es: any;
  codProducto: string;
  disable = true;
  msgs: Message[] = [];
  tipoPerfil = false;
  producto = new Producto(null, null, null);
  medida: MedidaProducto;
  medidas: MedidaProducto[] = [];
  ngOnInit() {
    this.medidasService
      .getMedidas()
      .subscribe(medidas => (this.medidas = medidas));
    this.rout.params.subscribe((params: Params) => {
      if (params['id'] === 'nuevo') {
        this.producto = new Producto('', '', null);
        this.tipoPerfil = false;
        this.disable = false;
      } else {
        this.tipoPerfil = true;
        this.codProducto = params['id'];
        this.servicio
          .getProductoByCod(this.codProducto)
          .subscribe((producto: Producto) => {
            this.producto = producto;
            this.medida = this.producto.medida;
          });
      }
    });
  }

  regresar($event) {
    this.router.navigate(['/productos'], { relativeTo: this.rout });
  }
  save($event) {
    if (this.tipoPerfil) {
      // Editando producto existente
      this.producto.medida = this.medida;
      this.servicio.updateProducto(this.producto).subscribe(
        data => {
          this.msgs = [
            {
              severity: 'info',
              summary: 'Confirmado',
              detail: data.message
            }
          ];
        },
        error => {
          this.msgs = [
            {
              severity: 'error',
              summary: 'Error',
              detail: 'Datos incorrectos, no se actualizo el producto'
            }
          ];
        }
      );
    } else {
      // Agregando un nuevo producto
      this.producto.medida = this.medida;
      this.servicio.addProducto(this.producto).subscribe(
        data => {
          this.producto = data;

          const existencia = new Existencia(null, null, null);

          existencia.productos = this.producto;
          existencia.cantidad = 0;
          this.existenciaService.addExistencias(existencia).subscribe(
            e => {
              this.msgs = [
                {
                  severity: 'info',
                  summary: 'Confirmado',
                  detail: 'Producto guardado'
                }
              ];
            },
            error => {
              this.msgs = [
                {
                  severity: 'error',
                  summary: 'Error',
                  detail: 'No se pudo guardar el producto, datos incorrectos'
                }
              ];
            }
          );
        },
        error => {
          this.msgs = [
            {
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo guardar el producto, datos incorrectos'
            }
          ];
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
      this.router.navigate(['/productos'], { relativeTo: this.rout });
    }
  }
  update($event) {
    this.disable = false;
  }
  confirm($event) {
    this.confirmation.confirm({
      message: 'Estas seguro que quieres eliminar?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete();
      }
    });
  }
  confirm2($event) {
    this.confirmation.confirm({
      message: 'Estas seguro que quieres cambiar los datos?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.save(event);
      }
    });
  }
  delete() {
    this.existenciaService
      .getExistenciaByProducto(this.producto)
      .subscribe(exis => {
        this.existenciaService.deleteExistencias(exis).subscribe(da => {
          this.servicio.deleteProducto(this.producto).subscribe(data => {
            console.log(data);
            this.msgs = [
              {
                severity: 'info',
                summary: 'Confirmado',
                detail: data.message
              }
            ];
          });
        });
      });
    setTimeout(() => {
      this.router.navigate(['/productos'], { relativeTo: this.rout });
    }, 1500);
  }
}
