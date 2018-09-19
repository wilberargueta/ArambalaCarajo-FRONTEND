import { Servicio } from './../../_model/servicio';
import { ConfirmationService, Message } from 'primeng/api';
import { ServicioService } from './../../_services/servicio.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ac-perfil-servicio',
  templateUrl: './perfil-servicio.component.html',
  styleUrls: ['./perfil-servicio.component.scss'],
  providers: [ConfirmationService]
})
export class PerfilServicioComponent implements OnInit {
  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private service: ServicioService,
    private confirmation: ConfirmationService
  ) {}

  es: any;

  idServicio: number;
  disable = true;
  msgs: Message[] = [];
  tipoPerfil = false;
  servicio = new Servicio(null, '', '', '');
  options: any[] = [{label: 'Si', icon: 'pi pi-check', value: true},
  {label: 'No', icon: 'pi pi-times', value: false}];

  ngOnInit() {
    this.rout.params.subscribe((params: Params) => {
      if (params['id'] === 'nuevo') {
        this.servicio = new Servicio(null, '', '', '');
        this.tipoPerfil = false;
        this.disable = false;
      } else {
        this.tipoPerfil = true;
        this.idServicio = params['id'];
        this.service.getServicioById(this.idServicio).subscribe(data => {
          this.servicio = data;
        });
      }
    });
  }

  regresar($event) {
    this.router.navigate(['/servicios'], { relativeTo: this.rout });
  }
  save($event) {
    if (this.tipoPerfil) {
      // Editando un servicio

      this.service.updateServicio(this.servicio).subscribe(data => {
        this.msgs = [
          {
            severity: 'info',
            summary: 'Confirmado',
            detail: data.message
          }
        ];
      });
    } else {
      // Guardando un servicio
      this.service.addServicio(this.servicio).subscribe(data => {
        this.servicio = data;
        this.msgs = [
          {
            severity: 'info',
            summary: 'Confirmado',
            detail: 'Servicio Agregado Correctamente'
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
      this.router.navigate(['/servicios'], { relativeTo: this.rout });
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
    this.service.deleteServicio(this.servicio).subscribe(data => {
      this.msgs = [
        {
          severity: 'info',
          summary: 'Confirmado',
          detail: data.message
        }
      ];
    });
    setTimeout(() => {
      this.router.navigate(['/servicios'], { relativeTo: this.rout });
    }, 1500);
    console.log('Eliminado');
  }


}
