import { MenuItem } from 'primeng/components/common/menuitem';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../_services/producto.service';
import { Producto } from '../../_model/producto';

@Component({
  selector: 'ac-tabla-producto',
  templateUrl: './tabla-producto.component.html',
  styleUrls: ['./tabla-producto.component.scss']
})
export class TablaProductoComponent implements OnInit {
  items: MenuItem[];
  constructor(
    private servicio: ProductoService
  ) {}

  productos: Producto[];
  productoSelec: Producto;
  cols: any[];

  ngOnInit() {
    this.servicio.getProducto().subscribe(data => {
      this.productos = data;
    });

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'medida', header: 'Medida' }
    ];
  }

}
