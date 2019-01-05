import { Component, OnInit } from '@angular/core';
import { Existencia } from '../_model/existencia';
import { ExistenciaService } from '../_services/existencia.service';

@Component({
  selector: 'ac-existencias',
  templateUrl: './existencias.component.html',
  styleUrls: ['./existencias.component.scss']
})
export class ExistenciasComponent implements OnInit {
  constructor(private existenciasService: ExistenciaService) {}
  existencias: Existencia[] = [];
  ngOnInit() {
    this.existencias = [];
    this.existenciasService
      .getExistencias()
      .subscribe(exis => (this.existencias = exis));
  }

  recargar() {
    this.existencias = [];
    this.existenciasService
      .getExistencias()
      .subscribe(exis => (this.existencias = exis));
  }
}
