import { Servicio } from './../../_model/servicio';
import { MenuItem } from 'primeng/components/common/menuitem';
import { ServicioService } from './../../_services/servicio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ac-tabla-servicio',
  templateUrl: './tabla-servicio.component.html',
  styleUrls: ['./tabla-servicio.component.scss']
})
export class TablaServicioComponent implements OnInit {

  items: MenuItem[];
  constructor(
    private service: ServicioService,
  ) {}

 servicios: Servicio[];
  servicioSelec: Servicio;
  cols: any[];
  ngOnInit() {
    this.service.getServicio().subscribe(data => {
      this.servicios = data;
    });
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'precio', header: 'Precio' },
      { field: 'detalle', header: 'Detalle' }
    ];
  }
}
