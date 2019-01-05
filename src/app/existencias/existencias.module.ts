import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExistenciasComponent } from './existencias.component';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ToolbarModule } from 'primeng/toolbar';
import { ExistenciaService } from '../_services/existencia.service';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    KeyFilterModule,
    ToolbarModule
  ],
  declarations: [ExistenciasComponent],
  providers: [ExistenciaService]
})
export class ExistenciasModule { }
