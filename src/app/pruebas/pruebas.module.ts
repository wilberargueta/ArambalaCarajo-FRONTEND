import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PruebasComponent } from './pruebas.component';

@NgModule({
  declarations: [PruebasComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class PruebasModule { }
