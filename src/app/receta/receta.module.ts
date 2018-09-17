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
import { RecetaProductoService } from './../_services/receta-producto.service';
import { RecetaService } from './../_services/receta.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetaComponent } from './receta.component';
import { PerfilRecetaComponent } from './perfil-receta/perfil-receta.component';
import { TablaRecetaComponent } from './tabla-receta/tabla-receta.component';

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
  declarations: [RecetaComponent, PerfilRecetaComponent, TablaRecetaComponent],
  providers: [RecetaService, RecetaProductoService]
})
export class RecetaModule { }
