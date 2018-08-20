import { Injectable } from '@angular/core';
@Injectable()
export class DateConvert {
  private valor = '';
  convertToString(fecha: string): string {
    this.valor = '';
    const result = fecha.split('/');
    for (let i = 0; i < result.length; i++) {
      this.valor += `-${result[i]}`;
    }
    return this.valor.replace('-', '');
  }
  convertToDate(fecha: string): string {
    this.valor = '';
    const result = fecha.split('-');
    for (let i = 0; i < result.length; i++) {
      this.valor += `/${result[i]}`;
    }
    return this.valor.replace('/', '');
  }
}
