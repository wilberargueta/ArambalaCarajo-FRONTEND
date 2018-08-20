import { DateConvert } from './../../_class/date-convert';
import { Message, ConfirmationService } from 'primeng/api';
import { ProveedorService } from './../../_services/proveedor.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../_model/proveedor';

@Component({
  selector: 'ac-perfil-proveedor',
  templateUrl: './perfil-proveedor.component.html',
  styleUrls: ['./perfil-proveedor.component.scss'],
  providers: [ConfirmationService]
})
export class PerfilProveedorComponent implements OnInit {
  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private servicio: ProveedorService,
    private confirmation: ConfirmationService
  ) {}

  es: any;

  codProveedor: string;
  disable = true;
  msgs: Message[] = [];
  tipoPerfil = false;
  proveedor = new Proveedor('', '', '', '', '', '');

  ngOnInit() {
    this.rout.params.subscribe((params: Params) => {
      if (params['id'] === 'nuevo') {
        this.proveedor = new Proveedor('', '', '', '', '', '');
        this.tipoPerfil = false;
        this.disable = false;
      } else {
        this.tipoPerfil = true;
        this.codProveedor = params['id'];
        this.servicio
          .getProveedorByCod(this.codProveedor)
          .subscribe((data: Proveedor) => {
            this.proveedor = data;
          });
      }
    });
  }

  regresar($event) {
    this.router.navigate(['/proveedores'], { relativeTo: this.rout });
  }
  save($event) {
    if (this.tipoPerfil) {
      console.log('Editado..');
      // console.log(this.empleado);
      this.servicio.updateProveedor(this.proveedor).subscribe(data => {
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
      this.servicio.addProveedor(this.proveedor).subscribe(data => {
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
      this.router.navigate(['/proveedores'], { relativeTo: this.rout });
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
    this.servicio.deleteProveedor(this.proveedor).subscribe(data => {
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
      this.router.navigate(['/proveedores'], { relativeTo: this.rout });
    }, 1500);
    console.log('Eliminado');
  }
}
