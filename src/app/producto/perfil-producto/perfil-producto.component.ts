import { ConfirmationService, Message, SelectItem } from 'primeng/api';
import { ProductoService } from './../../_services/producto.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../_model/producto';

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
    private confirmation: ConfirmationService
  ) {}

  es: any;
  medidas: SelectItem[];
  codProducto: string;
  disable = true;
  msgs: Message[] = [];
  tipoPerfil = false;
  producto = new Producto('', '', '');
  medida: string;

  ngOnInit() {
    this.rout.params.subscribe((params: Params) => {
      if (params['id'] === 'nuevo') {
        this.producto = new Producto('', '', '');
        this.tipoPerfil = false;
        this.disable = false;
      } else {
        this.tipoPerfil = true;
        this.codProducto = params['id'];
        this.servicio
          .getProductoByCod(this.codProducto)
          .subscribe((producto: Producto) => {
            this.producto = producto;
          });
      }
    });
    this.medidas = [{ label: 'Seleccione...', value: null },
                    { label: 'Libras', value: 'libra' },
                    { label: 'Kilogramos', value: 'kilogramos' },
                    { label: 'Gramos', value: 'gramos' },
                    { label: 'Litro', value: 'libra' },
    ];
  }

  regresar($event) {
    this.router.navigate(['/productos'], { relativeTo: this.rout });
  }
  save($event) {
    if (this.tipoPerfil) {
      console.log('Editado..');
      // console.log(this.empleado);
      this.servicio.updateProducto(this.producto).subscribe(data => {
        this.msgs = [
          {
            severity: 'info',
            summary: 'Confirmado',
            detail: data.message
          }
        ];
        console.log(data);
      });
    } else {
      // this.servicio.addEmpleado()
      console.log('Guardado..');
      this.servicio.addProducto(this.producto).subscribe(data => {
        this.msgs = [
          {
            severity: 'info',
            summary: 'Confirmado',
            detail: data.message
          }
        ];
        console.log(data);
      });
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
    setTimeout(() => {
      this.router.navigate(['/productos'], { relativeTo: this.rout });
    }, 1500);
    console.log('Eliminado');
  }
}
