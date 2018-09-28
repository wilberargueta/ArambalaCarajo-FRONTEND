import { UsuarioEmpleadoService } from './../_services/usuario-empleado.service';
import { UsuarioRoleService } from './../_services/usuario-role.service';
import { UsuarioService } from './../_services/usuario.service';
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
import { UsuarioComponent } from './usuario.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { TablaUsuarioComponent } from './tabla-usuario/tabla-usuario.component';
import {PasswordModule} from 'primeng/password';
import {DropdownModule} from 'primeng/dropdown';
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
    PasswordModule,
    DropdownModule
  ],
  declarations: [UsuarioComponent, PerfilUsuarioComponent, TablaUsuarioComponent],
  providers: [UsuarioService, UsuarioRoleService, UsuarioEmpleadoService]
})
export class UsuarioModule { }
