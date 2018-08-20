import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateConvert'
})
export class DateConvertPipe implements PipeTransform {
  private valor = '';
  transform(value: string, args: string[]): string {
    const result = value.split('/');
    for (let i = 0; i < result.length; i++) {
      this.valor += `-${result[i]}`;
    }
    return this.valor.replace('-', '');
  }
}
