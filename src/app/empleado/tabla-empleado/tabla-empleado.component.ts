import { Empleado } from './../../_model/empleado';
import { EmpleadoService } from './../../_services/empleado.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'ac-tabla-empleado',
  templateUrl: './tabla-empleado.component.html',
  styleUrls: ['./tabla-empleado.component.scss']
})
export class TablaEmpleadoComponent implements OnInit {
  items: MenuItem[];
  constructor(
    private servicio: EmpleadoService
  ) {}

  empleados: Empleado[];
  empleadoSelec: Empleado;

  cols: any[];

  ngOnInit() {

    this.servicio.getEmpleado().subscribe(data => {
      this.empleados = data;
    });

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'fechaNacimiento', header: 'Fecha Nacimiento' },
      { field: 'direccion', header: 'Direccion' },
      { field: 'telefono', header: 'Telefono' },
      { field: 'dui', header: 'Dui' }
    ];
  }


}
