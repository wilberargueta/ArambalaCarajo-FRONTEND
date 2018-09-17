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

@NgModule({
  declarations: [
    AppComponent
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
    RecetaModule
  ],
  providers: [EmpleadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
