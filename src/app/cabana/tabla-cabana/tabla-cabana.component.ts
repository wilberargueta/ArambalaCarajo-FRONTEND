import { Cabana } from './../../_model/cabana';
import { ActivatedRoute, Router } from '@angular/router';
import { CabanaService } from './../../_services/cabana.service';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ac-tabla-cabana',
  templateUrl: './tabla-cabana.component.html',
  styleUrls: ['./tabla-cabana.component.scss']
})
export class TablaCabanaComponent implements OnInit {
  items: MenuItem[];
  constructor(
    private servicio: CabanaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  cabanas: Cabana[];
  cabanaSelec: Cabana;
  cols: any[];

  ngOnInit() {
    this.servicio.getCabanas().subscribe(data => {
      this.cabanas = data;
    });

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'detalle', header: 'Detalle' },
      { field: 'disponible', header: 'Disponible' },
      { field: 'precio', header: 'Precio' }
    ];
  }


}
