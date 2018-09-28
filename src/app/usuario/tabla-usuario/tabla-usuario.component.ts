import { MenuItem } from 'primeng/components/common/menuitem';
import { Component, OnInit } from '@angular/core';
import { UsuarioEmpleadoService } from '../../_services/usuario-empleado.service';
import { UsuarioEmpleado } from '../../_model/usuario-empleado';

@Component({
  selector: 'ac-tabla-usuario',
  templateUrl: './tabla-usuario.component.html',
  styleUrls: ['./tabla-usuario.component.scss']
})
export class TablaUsuarioComponent implements OnInit {

  items: MenuItem[];
  constructor(private service: UsuarioEmpleadoService) {}

  usuarios: UsuarioEmpleado[];
  usuarioSelec: UsuarioEmpleado;
  cols: any[];
  ngOnInit() {
    this.service.getUsuarioEmpleado().subscribe(data => {
      this.usuarios = data;
    });
    this.cols = [
      { field: 'codEmpleado', header: 'COD' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'nick', header: 'Nick' }
    ];
  }

}
