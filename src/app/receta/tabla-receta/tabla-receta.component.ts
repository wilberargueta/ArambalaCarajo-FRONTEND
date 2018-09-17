import { Receta } from './../../_model/receta';
import { RecetaService } from './../../_services/receta.service';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ac-tabla-receta',
  templateUrl: './tabla-receta.component.html',
  styleUrls: ['./tabla-receta.component.scss']
})
export class TablaRecetaComponent implements OnInit {
  items: MenuItem[];
  constructor(
    private servicio: RecetaService
  ) {}

  recetas: Receta[];
  recetaSelec: Receta;
  cols: any[];

  ngOnInit() {
    this.servicio.getReceta().subscribe(data => {
      this.recetas = data;
    });

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'detalle', header: 'Detalle' }
    ];
  }



}
