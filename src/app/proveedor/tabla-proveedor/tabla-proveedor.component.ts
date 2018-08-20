import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from './../../_services/proveedor.service';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../_model/proveedor';

@Component({
  selector: 'ac-tabla-proveedor',
  templateUrl: './tabla-proveedor.component.html',
  styleUrls: ['./tabla-proveedor.component.scss']
})
export class TablaProveedorComponent implements OnInit {
  items: MenuItem[];
  constructor(
    private servicio: ProveedorService
  ) {}

  proveedores: Proveedor[];
  proveedorSelec: Proveedor;
  cols: any[];

  ngOnInit() {
    this.servicio.getProveedor().subscribe(data => {
      this.proveedores = data;
    });

    this.cols = [
      { field: 'razonSocial', header: 'Razon Social' },
      { field: 'correo', header: 'Correo' },
      { field: 'nit', header: 'Nit' },
      { field: 'direccion', header: 'Direccion' },
      { field: 'telefono', header: 'Telefono' }
    ];
  }

}
