import { CategoriaService } from './../_services/categoria.service';
import { MenuServicioService } from './../_services/menu-servicio.service';
import { MenuCabanaService } from './../_services/menu-cabana.service';
import { MenuCategoriaMenuService } from './../_services/menu-categoria-menu.service';
import { MenuRecetaService } from './../_services/menu-receta.service';
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
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { PerfilMenuComponent } from './perfil-menu/perfil-menu.component';
import { TablaMenuComponent } from './tabla-menu/tabla-menu.component';
import { RecetaService } from '../_services/receta.service';
import { PerfilMenuServicioComponent } from './perfil-menu-servicio/perfil-menu-servicio.component';
import { PerfilMenuCabanaComponent } from './perfil-menu-cabana/perfil-menu-cabana.component';
import {ToastModule} from 'primeng/toast';



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
    ToastModule
  ],
  declarations: [
    MenuComponent,
    PerfilMenuComponent,
    TablaMenuComponent,
    PerfilMenuServicioComponent,
    PerfilMenuCabanaComponent
  ],
  providers: [
    MenuService,
    MenuRecetaService,
    MenuCategoriaMenuService,
    RecetaService,
    MenuRecetaService,
    MenuCabanaService,
    MenuServicioService,
    MenuCabanaService,
    CategoriaService
  ]
})
export class MenuModule {}
