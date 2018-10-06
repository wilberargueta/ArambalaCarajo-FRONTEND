import { MenuCategoriaService } from './../_services/menu-categoria.service';
import { MenuService } from './../_services/menu.service';
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
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TomaPedidoComponent } from './toma-pedido.component';
import { PanelModule } from 'primeng/panel';
import { DataScrollerModule } from 'primeng/datascroller';
import { DataViewModule } from 'primeng/dataview';
import { MenuServicioComponent } from './menu-servicio/menu-servicio.component';
import { CategoriaService } from '../_services/categoria.service';
import { MenuModule } from 'primeng/menu';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { MenuComidaComponent } from './menu-comida/menu-comida.component';
import { MenuCabanaComponent } from './menu-cabana/menu-cabana.component';
import { MenuCategoriaMenuComponent } from './menu-categoria-menu/menu-categoria-menu.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';

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
    TomaPedidoComponent,
    MenuServicioComponent,
    MenuPrincipalComponent,
    MenuComidaComponent,
    MenuCabanaComponent,
    MenuCategoriaMenuComponent,
    CuentasComponent
  ],
  providers: [MenuService, MenuCategoriaService, CategoriaService]
})
export class TomaPedidoModule {}
