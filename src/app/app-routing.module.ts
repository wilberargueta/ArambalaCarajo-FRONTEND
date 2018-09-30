import { LoginComponent } from './login/login.component';
import { PerfilUsuarioComponent } from './usuario/perfil-usuario/perfil-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { PerfilServicioComponent } from './servicio/perfil-servicio/perfil-servicio.component';
import { PerfilMenuCabanaComponent } from './menu/perfil-menu-cabana/perfil-menu-cabana.component';
import { ServicioComponent } from './servicio/servicio.component';
import { PerfilMenuComponent } from './menu/perfil-menu/perfil-menu.component';
import { TablaMenuComponent } from './menu/tabla-menu/tabla-menu.component';
import { MenuComponent } from './menu/menu.component';
import { PerfilProductoCategoriaComponent } from './categoria/perfil-producto-categoria/perfil-producto-categoria.component';
import { PerfilMenuCategoriaComponent } from './categoria/perfil-menu-categoria/perfil-menu-categoria.component';

import { TablaCategoriaComponent } from './categoria/tabla-categoria/tabla-categoria.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PerfilRecetaComponent } from './receta/perfil-receta/perfil-receta.component';
import { TablaRecetaComponent } from './receta/tabla-receta/tabla-receta.component';
import { RecetaComponent } from './receta/receta.component';
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
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadoPerfilComponent } from './empleado/empleado-perfil/empleado-perfil.component';
import { TablaCompraComponent } from './compra/tabla-compra/tabla-compra.component';
import { PerfilCompraComponent } from './compra/perfil-compra/perfil-compra.component';
import { TablaServicioComponent } from './servicio/tabla-servicio/tabla-servicio.component';
import { PerfilMenuServicioComponent } from './menu/perfil-menu-servicio/perfil-menu-servicio.component';
import { TablaUsuarioComponent } from './usuario/tabla-usuario/tabla-usuario.component';

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
  },
  {
    path: 'recetas',
    component: RecetaComponent,
    children: [
      { path: '', component: TablaRecetaComponent },
      { path: ':id', component: PerfilRecetaComponent },
      { path: 'nuevo', component: PerfilRecetaComponent }
    ]
  },
  {
    path: 'categorias',
    component: CategoriaComponent,
    children: [
      { path: '', component: TablaCategoriaComponent },
      { path: 'menu/:id', component: PerfilMenuCategoriaComponent },
      { path: 'menu/nuevo', component: PerfilMenuCategoriaComponent },
      { path: 'producto/:id', component: PerfilProductoCategoriaComponent },
      { path: 'producto/nuevo', component: PerfilProductoCategoriaComponent }
    ]
  },
  {
    path: 'menus',
    component: MenuComponent,
    children: [
      { path: '', component: TablaMenuComponent },
      { path: ':id', component: PerfilMenuComponent },
      { path: 'nuevo', component: PerfilMenuComponent },
      { path: 'servicio/:id', component: PerfilMenuServicioComponent },
      { path: 'servicio/nuevo', component: PerfilMenuServicioComponent },
      { path: 'cabaña/:id', component: PerfilMenuCabanaComponent },
      { path: 'cabaña/nuevo', component: PerfilMenuCabanaComponent }
    ]
  },
  {
    path: 'servicios',
    component: ServicioComponent,
    children: [
      { path: '', component: TablaServicioComponent },
      { path: ':id', component: PerfilServicioComponent },
      { path: 'nuevo', component: PerfilServicioComponent }
    ]
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      { path: '', component: TablaUsuarioComponent },
      { path: ':id', component: PerfilUsuarioComponent },
      { path: 'nuevo', component: PerfilUsuarioComponent }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
