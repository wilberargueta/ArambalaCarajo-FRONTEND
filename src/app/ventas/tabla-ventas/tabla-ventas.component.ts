import { Component, OnInit } from '@angular/core';
import { CajaVentaService } from '../../_services/caja-venta.service';
import { CajaVenta } from '../../_model/caja-venta';

@Component({
  selector: 'ac-tabla-ventas',
  templateUrl: './tabla-ventas.component.html',
  styleUrls: ['./tabla-ventas.component.scss']
})
export class TablaVentasComponent implements OnInit {
  constructor(private cajaVentaService: CajaVentaService) {}

  ventasLista: CajaVenta[] = [];
  ventaSelec: CajaVenta = new CajaVenta(null, null, null, null);
  cols: any[];
  ngOnInit() {
    this.cols = [
      { field: 'venta.fecha', header: 'Fecha Venta' },
      { field: 'caja.usuario.nick', header: 'Empleado' },
      { field: 'venta.detalle', header: 'Detalle' }
    ];
    this.cajaVentaService
      .getCajaVenta()
      .subscribe(cajaVenta => (this.ventasLista = cajaVenta));
  }
}
