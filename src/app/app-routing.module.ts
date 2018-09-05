import { PerfilProductoComponent } from './producto/perfil-producto/perfil-producto.component';
import { TablaProductoComponent } from './producto/tabla-producto/tabla-producto.component';
import { ProductoComponent } from './producto/producto.component';
import { CompraComponent } from './compra/compra.component';
import { PerfilCabanaComponent } from './cabana/perfil-cabana/perfil-cabana.component';
import { TablaCabanaComponent } from './cabana/tabla-cabana/tabla-cabana.component';
import { CabanaComponent } from './cabana/cabana.component';
import { PerfilProveedorComponent } from './proveedor/perfil-proveedor/perfil-proveedor.component';
import { TablaProveedorComponent } from './proveedor/tabla-proveedor/tabla-proveedor.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { TablaEmpleadoComponent } from './empleado/tabla-empleado/tabla-empleado.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadoPerfilComponent } from './empleado/empleado-perfil/empleado-perfil.component';
import { TablaCompraComponent } from './compra/tabla-compra/tabla-compra.component';
import { PerfilCompraComponent } from './compra/perfil-compra/perfil-compra.component';

const routes: Routes = [
  {
    path: 'empleados',
    component: EmpleadoComponent,
    children: [
      { path: '', component: TablaEmpleadoComponent },
      { path: ':id', component: EmpleadoPerfilComponent },
      { path: 'nuevo', component: EmpleadoPerfilComponent }
    ]
  },
  {
    path: 'proveedores',
    component: ProveedorComponent,
    children: [
      { path: '', component: TablaProveedorComponent },
      { path: ':id', component: PerfilProveedorComponent },
      { path: 'nuevo', component: PerfilProveedorComponent }
    ]
  },
  {
    path: 'cabañas',
    component: CabanaComponent,
    children: [
      { path: '', component: TablaCabanaComponent },
      { path: ':id', component: PerfilCabanaComponent },
      { path: 'nuevo', component: PerfilCabanaComponent }
    ]
  },
  {
    path: 'compras',
    component: CompraComponent,
    children: [
      { path: '', component: TablaCompraComponent },
      { path: ':id', component: PerfilCompraComponent },
      { path: 'nuevo', component: PerfilCompraComponent }
    ]
  },
  {
    path: 'productos',
    component: ProductoComponent,
    children: [
      { path: '', component: TablaProductoComponent },
      { path: ':id', component: PerfilProductoComponent },
      { path: 'nuevo', component: PerfilProductoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
