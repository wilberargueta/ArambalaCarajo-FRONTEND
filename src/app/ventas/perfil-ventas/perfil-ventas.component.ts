import { CuentaMenu } from './../../_model/cuenta-menu';
import { CajaVenta } from './../../_model/caja-venta';
import { MessageService } from 'primeng/api';
import { CuentaMenuService } from './../../_services/cuenta-menu.service';
import { CajaVentaService } from './../../_services/caja-venta.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'ac-perfil-ventas',
  templateUrl: './perfil-ventas.component.html',
  styleUrls: ['./perfil-ventas.component.scss'],
  providers: [MessageService]
})
export class PerfilVentasComponent implements OnInit {
  constructor(
    private cajaVentaService: CajaVentaService,
    private cuentaMenuService: CuentaMenuService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private message: MessageService
  ) {}

  cajaVenta: CajaVenta = new CajaVenta(null, null, null, null);
  cuentaMenu: CuentaMenu[] = [];
  cu: CuentaMenu;
  cols: any;
  total = 0;
  ngOnInit() {
    this.cols = [
      { field: 'menu.nombre', header: 'Menu' },
      { field: 'menu.precio', header: 'Precio' },
      { field: 'cantidad', header: 'Cantidad' },
      { field: 'subtotal', header: 'Sub-Total' }
    ];
    let id = 0;
    this.activatedRouter.params.subscribe((params: Params) => {
      id = params['id'];
    });

    if (id === 0) {
      setTimeout(() => {
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Venta no registrada, verifique datos'
        });
        this.regresar();
      }, 1500);
    } else {
      this.cajaVentaService.getCajaVentaById(id).subscribe(cv => {
        this.cajaVenta = cv;
        this.cuentaMenuService
          .getCuentaMenuByCuenta(this.cajaVenta.cuenta)
          .subscribe(cm => {
            this.cuentaMenu = cm;
            this.cuentaMenu.forEach(cms => {
              this.total = this.total + cms.cantidad * +cms.menu.precio;
            });
          });
      });
    }
  }

  regresar() {
    this.router.navigate(['/ventas']);
  }
}
