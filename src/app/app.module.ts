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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EmpleadoModule } from './empleado/empleado.module';
import { EmpleadoService } from './_services/empleado.service';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MenubarModule} from 'primeng/menubar';
import { CabanaModule } from './cabana/cabana.module';
import { CompraModule } from './compra/compra.module';
import { ProductoModule } from './producto/producto.module';
import { RecetaModule } from './receta/receta.module';
import { CategoriaModule } from './categoria/categoria.module';
import { MenuModule } from './menu/menu.module';
import { ServicioModule } from './servicio/servicio.module';
import { UsuarioModule } from './usuario/usuario.module';
import { LoginComponent } from './login/login.component';
import {PanelModule} from 'primeng/panel';
import {ToastModule} from 'primeng/toast';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
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
    ToastModule
  ],
  providers: [EmpleadoService, LoginService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  {
    provide: LocationStrategy, useClass: HashLocationStrategy
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
