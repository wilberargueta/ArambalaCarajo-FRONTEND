import { Cabana } from './../../_model/cabana';
import { ConfirmationService, Message } from 'primeng/api';
import { CabanaService } from './../../_services/cabana.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ac-perfil-cabana',
  templateUrl: './perfil-cabana.component.html',
  styleUrls: ['./perfil-cabana.component.scss'],
  providers: [ConfirmationService]
})
export class PerfilCabanaComponent implements OnInit {

  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private servicio: CabanaService,
    private confirmation: ConfirmationService
  ) {}

  es: any;

  codCabana: string;
  disable = true;
  msgs: Message[] = [];
  tipoPerfil = false;
  cabana = new Cabana('', '', '', null, '');
  options: any[] = [{label: 'Si', icon: 'pi pi-check', value: true},
  {label: 'No', icon: 'pi pi-times', value: false}];

  ngOnInit() {
    this.rout.params.subscribe((params: Params) => {
      if (params['id'] === 'nuevo') {
        this.cabana = new Cabana('', '', '', null, '');
        this.tipoPerfil = false;
        this.disable = false;
      } else {
        this.tipoPerfil = true;
        this.codCabana = params['id'];
        this.servicio
          .getCabanaById(this.codCabana)
          .subscribe((data: Cabana) => {
            this.cabana = data;
          });
      }
    });
  }

  regresar($event) {
    this.router.navigate(['/cabañas'], { relativeTo: this.rout });
  }
  save($event) {
    if (this.tipoPerfil) {
      console.log('Editado..');
      // console.log(this.empleado);
      this.servicio.updateCabana(this.cabana).subscribe(data => {
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
      this.servicio.addCabana(this.cabana).subscribe(data => {
        this.cabana = data;
        this.msgs = [
          {
            severity: 'info',
            summary: 'Confirmado',
            detail: 'Cabaña Agregada Correctamente'
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
      this.router.navigate(['/cabañas'], { relativeTo: this.rout });
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
    this.servicio.deleteCabana(this.cabana).subscribe(data => {
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
      this.router.navigate(['/cabañas'], { relativeTo: this.rout });
    }, 1500);
    console.log('Eliminado');
  }

}
