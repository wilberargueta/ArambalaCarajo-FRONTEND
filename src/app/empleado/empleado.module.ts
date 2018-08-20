import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoComponent } from './empleado.component';
import { TablaEmpleadoComponent } from './tabla-empleado/tabla-empleado.component';
import { TableModule } from 'primeng/table';
import { EmpleadoService } from '../_services/empleado.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { EmpleadoPerfilComponent } from './empleado-perfil/empleado-perfil.component';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DateConvertPipe } from '../_pipes/date-convert.pipe';
import {InputMaskModule} from 'primeng/inputmask';
import {KeyFilterModule} from 'primeng/keyfilter';
import {MessagesModule} from 'primeng/messages';
import {ToolbarModule} from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {GrowlModule} from 'primeng/growl';
import { DateConvert } from '../_class/date-convert';

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
    GrowlModule
  ],
  declarations: [
    EmpleadoComponent,
    TablaEmpleadoComponent,
    EmpleadoPerfilComponent,
    DateConvertPipe
  ],
  providers: [EmpleadoService, DateConvert]
})
export class EmpleadoModule {}
