
import { MenuItem } from 'primeng/components/common/menuitem';
import { CompraService } from './../../_services/compra.service';
import { Component, OnInit } from '@angular/core';
import { Compra } from '../../_model/compra';

@Component({
  selector: 'ac-tabla-compra',
  templateUrl: './tabla-compra.component.html',
  styleUrls: ['./tabla-compra.component.scss']
})
export class TablaCompraComponent implements OnInit {
  items: MenuItem[];
  constructor(
    private servicio: CompraService
  ) {}

  compras: Compra[];
  compraSelec: Compra;
  cols: any[];

  ngOnInit() {
    this.servicio.getCompras().subscribe(data => {
      this.compras = data;
    });

    this.cols = [
      { field: 'registroCompra', header: 'Nº Registro' },
      { field: 'fechaCompra', header: 'Fecha De Compra' },
      { field: 'proveedor', header: 'Proveedor' },
      { field: 'detalle', header: 'Detalle' }
    ];
  }


}
