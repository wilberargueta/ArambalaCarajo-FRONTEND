import { CuentaMenu } from '../_model/cuenta-menu';
import { MenuReceta } from '../_model/menu-receta';
import { MenuRecetaService } from '../_services/menu-receta.service';
import { RecetaProducto } from '../_model/receta-producto';
import { ExistenciaService } from '../_services/existencia.service';
import { RecetaProductoService } from '../_services/receta-producto.service';
import { Existencia } from '../_model/existencia';
import { ConvertidorMedidasService } from '../_services/convertidor-medidas.service';

export class ActualizarExistencias {
  rectaMen: MenuReceta[] = [];
  recetaPro: RecetaProducto[] = [];

  actualizarProducto(
    menu: CuentaMenu,
    menuRecetaService: MenuRecetaService,
    recetaProductoService: RecetaProductoService,
    exitenciaService: ExistenciaService,
    convertidorService: ConvertidorMedidasService
  ): boolean {
    let confirmado = false;
    menuRecetaService.getMenuRecetaByMenu(menu.menu).subscribe(mr => {
      this.rectaMen = mr;
      this.rectaMen.forEach(r => {
        recetaProductoService
          .getRecetaProductoByReceta(r.receta)
          .subscribe(data => {
            this.recetaPro = data;
            this.recetaPro.forEach(p => {
              let exist = new Existencia(null, null, null);
              exitenciaService
                .getExistenciaByProducto(p.producto)
                .subscribe(ex => {
                  const total = convertidorService.covertir(
                    p.producto.medida,
                    p.medida,
                    p.cantidad
                  );
                  exist = ex;
                  console.log(
                    `Valor Inicial:[${exist.cantidad}]=> Valor Nuevo:[${total *
                      menu.cantidad}]`
                  );
                  exist.cantidad = exist.cantidad - total * menu.cantidad;
                  exitenciaService.updateExistencias(exist).subscribe(re => {
                    confirmado = true;
                  });
                });
            });
          });
      });
    });
    return confirmado;
  }
}
