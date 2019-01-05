import { UsuarioEmpleadoService } from './_services/usuario-empleado.service';
import { UsuarioRoleService } from './_services/usuario-role.service';
import { UsuarioService } from './_services/usuario.service';
import { LoginParamService } from './_services/login-param.service';
import { LoginGuardService } from './_services/login-guard.service';

import { TokenInterceptor } from './_class/token-interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { LoginService } from './_services/login.service';
import { ProveedorModule } from './proveedor/proveedor.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpleadoModule } from './empleado/empleado.module';
import { EmpleadoService } from './_services/empleado.service';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenubarModule } from 'primeng/menubar';
import { CabanaModule } from './cabana/cabana.module';
import { CompraModule } from './compra/compra.module';
import { ProductoModule } from './producto/producto.module';
import { RecetaModule } from './receta/receta.module';
import { CategoriaModule } from './categoria/categoria.module';
import { MenuModule } from './menu/menu.module';
import { ServicioModule } from './servicio/servicio.module';
import { UsuarioModule } from './usuario/usuario.module';
import { LoginComponent } from './login/login.component';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import {SidebarModule} from 'primeng/sidebar';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import {ToolbarModule} from 'primeng/toolbar';
import { HomeComponent } from './home/home.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import { TomaPedidoModule } from './toma-pedido/toma-pedido.module';
import { CajeroModule } from './cajero/cajero.module';

import {TieredMenuModule} from 'primeng/tieredmenu';
import { MenusComponent } from './menus/menus.component';
import { VentasModule } from './ventas/ventas.module';
import { ExistenciasModule } from './existencias/existencias.module';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, MenusComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    EmpleadoModule,
    ProveedorModule,
    SplitButtonModule,
    MenubarModule,
    CabanaModule,
    CompraModule,
    ProductoModule,
    RecetaModule,
    CategoriaModule,
    MenuModule,
    ServicioModule,
    UsuarioModule,
    PanelModule,
    FormsModule,
    TableModule,
    HttpClientModule,
    ToastModule,
    SidebarModule,
    ToolbarModule,
    PanelMenuModule,
    TomaPedidoModule,
    CajeroModule,
    TieredMenuModule,
    VentasModule,
    ExistenciasModule
  ],
  providers: [
    EmpleadoService,
    LoginService,
    LoginGuardService,
    LoginParamService,
    UsuarioService,
    UsuarioEmpleadoService,
    UsuarioRoleService


    ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
