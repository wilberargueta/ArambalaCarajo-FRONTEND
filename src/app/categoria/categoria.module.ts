import { ProductoCategoriaProductoService } from './../_services/producto-categoria-producto.service';
import { MenuCategoriaMenuService } from './../_services/menu-categoria-menu.service';
import { CategoriaProductoService } from './../_services/categoria-producto.service';
import { CategoriaMenuService } from './../_services/categoria-menu.service';
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
import { CategoriaComponent } from './categoria.component';
import { TablaCategoriaComponent } from './tabla-categoria/tabla-categoria.component';
import { PerfilProductoCategoriaComponent } from './perfil-producto-categoria/perfil-producto-categoria.component';
import { PerfilMenuCategoriaComponent } from './perfil-menu-categoria/perfil-menu-categoria.component';

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
    DialogModule
  ],
  declarations: [CategoriaComponent, TablaCategoriaComponent, PerfilProductoCategoriaComponent, PerfilMenuCategoriaComponent],
  providers: [
    CategoriaMenuService,
    CategoriaProductoService,
    MenuCategoriaMenuService,
    ProductoCategoriaProductoService
  ]
})
export class CategoriaModule {}
