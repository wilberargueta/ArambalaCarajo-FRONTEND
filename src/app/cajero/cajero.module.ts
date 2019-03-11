import { VentaTarjetaService } from './../_services/venta-tarjeta.service';
import { TarjetaService } from './../_services/tarjeta.service';
import { FacturaService } from './../_services/factura.service';
import { FacturaVentaService } from './../_services/factura-venta.service';
import { TipoComprobanteService } from './../_services/tipo-comprobante.service';
import { CajaService } from './../_services/caja.service';
import { VentaService } from './../_services/venta.service';
import { CajaVentaService } from './../_services/caja-venta.service';
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
import { ToastModule } from 'primeng/toast';
import { TicketVentaService } from '../_services/ticket-venta.service';
import { ModalComprobanteComponent } from './modal-comprobante/modal-comprobante.component';

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
    OverlayPanelModule,
    ToastModule
  ],
  declarations: [
    CajeroComponent,
    CuentasComponent,
    CajaCabanaComponent,
    CajaCategoriaMenuComponent,
    CajaComidaComponent,
    CajaPrincipalComponent,
    CajaServicioComponent,
    ModalComprobanteComponent
  ],
  providers: [
    CajaVentaService,
    VentaService,
    CajaService,
    TicketVentaService,
    TipoComprobanteService,
    FacturaVentaService,
    FacturaService,
    TarjetaService,
    VentaTarjetaService
  ]
})
export class CajeroModule {}
