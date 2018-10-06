import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from './../menu/menu.module';
import { DataViewModule } from 'primeng/dataview';
import { DataScrollerModule } from 'primeng/datascroller';
import { DialogModule } from 'primeng/dialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GrowlModule } from 'primeng/growl';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CajeroComponent } from './cajero.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { CajaCabanaComponent } from './caja-cabana/caja-cabana.component';
import { CajaCategoriaMenuComponent } from './caja-categoria-menu/caja-categoria-menu.component';
import { CajaComidaComponent } from './caja-comida/caja-comida.component';
import { CajaPrincipalComponent } from './caja-principal/caja-principal.component';
import { CajaServicioComponent } from './caja-servicio/caja-servicio.component';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    PanelModule,
    CalendarModule,
    FormsModule,
    InputMaskModule,
    KeyFilterModule,
    ConfirmDialogModule,
    MessagesModule,
    ToolbarModule,
    SplitButtonModule,
    GrowlModule,
    SelectButtonModule,
    AutoCompleteModule,
    ScrollPanelModule,
    DialogModule,
    DataScrollerModule,
    DataViewModule,
    MenuModule,
    OverlayPanelModule
  ],
  declarations: [
    CajeroComponent,
    CuentasComponent,
    CajaCabanaComponent,
    CajaCategoriaMenuComponent,
    CajaComidaComponent,
    CajaPrincipalComponent,
    CajaServicioComponent
  ]
})
export class CajeroModule {}
