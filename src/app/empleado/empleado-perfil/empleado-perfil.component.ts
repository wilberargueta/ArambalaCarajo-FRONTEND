import { Empleado } from './../../_model/empleado';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../_services/empleado.service';
import { DatePipe } from '@angular/common';
import { Message, ConfirmationService } from 'primeng/api';
import { DateConvert } from '../../_class/date-convert';

@Component({
  selector: 'ac-empleado-perfil',
  templateUrl: './empleado-perfil.component.html',
  styleUrls: ['./empleado-perfil.component.scss'],
  providers: [ConfirmationService]
})
export class EmpleadoPerfilComponent implements OnInit {
  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private servicio: EmpleadoService,
    private confirmation: ConfirmationService,
    private convert: DateConvert
  ) {}

  es: any;

  codEmpleado: string;
  disable = true;
  msgs: Message[] = [];
  tipoPerfil = false;
  empleado = new Empleado('', '', '', '', '', null, '');
  fechaNacimiento: string;

  ngOnInit() {
    this.rout.params.subscribe((params: Params) => {
      if (params['id'] === 'nuevo') {
        this.empleado = new Empleado('', '', '', '', '', '', '');
        this.tipoPerfil = false;
        this.disable = false;
      } else {
        this.tipoPerfil = true;
        this.codEmpleado = params['id'];
        this.servicio
          .getEmpleadoByCod(this.codEmpleado)
          .subscribe((empleado: Empleado) => {
            this.empleado = empleado;
            this.fechaNacimiento = this.convert.convertToString(
              this.empleado.fechaNacimiento
            );
          });
      }
    });
  }

  regresar($event) {
    this.router.navigate(['/empleados'], { relativeTo: this.rout });
  }
  save($event) {
    this.empleado.fechaNacimiento = this.fechaNacimiento;

    if (this.tipoPerfil) {
      console.log('Editado..');
      // console.log(this.empleado);
      this.servicio.updateEmpleado(this.empleado).subscribe(data => {
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
      this.servicio.addEmpleado(this.empleado).subscribe(data => {
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
      this.router.navigate(['/empleados'], { relativeTo: this.rout });
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
    this.servicio.deleteEmpleado(this.empleado).subscribe(data => {
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
      this.router.navigate(['/empleados'], { relativeTo: this.rout });
    }, 1500);
    console.log('Eliminado');
  }
}
