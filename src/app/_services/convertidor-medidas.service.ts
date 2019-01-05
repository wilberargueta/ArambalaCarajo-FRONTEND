import { Injectable } from '@angular/core';
import { MedidaProducto } from '../_model/medida-producto';
import { Convertidor } from '../_class/convertidor';

@Injectable({
  providedIn: 'root'
})
export class ConvertidorMedidasService {
  constructor() {}
  private converter: Convertidor = new Convertidor();
  covertir(
    medidaInicial: MedidaProducto,
    medidaTemporal: MedidaProducto,
    cantidad: number
  ): number {
    switch (medidaInicial.tipoMedida) {
      case 'Libra':
        switch (medidaTemporal.tipoMedida) {
          case 'Libra':
            return cantidad;

          case 'Kilogramo':
            return this.converter.ofKilogramoToLibra(cantidad);

          case 'Gramo':
            return this.converter.ofGramoToLibra(cantidad);

          case 'Onza':
            return this.converter.ofOnzaToLibra(cantidad);
        }
        break;
      case 'Kilogramo':
        switch (medidaTemporal.tipoMedida) {
          case 'Libra':
            return this.converter.ofLibraToKilogramo(cantidad);

          case 'Kilogramo':
            return cantidad;

          case 'Gramo':
            return this.converter.ofGramoToKilogramo(cantidad);
          case 'Onza':
            return this.converter.ofOnzaToKilogramo(cantidad);
        }
        break;
      case 'Gramo':
        switch (medidaTemporal.tipoMedida) {
          case 'Libra':
            return this.converter.ofLibraToGramo(cantidad);

          case 'Kilogramo':
            return this.converter.ofKilogramoToGramo(cantidad);

          case 'Gramo':
            return cantidad;
          case 'Onza':
            return this.converter.ofOnzaToGramo(cantidad);
        }
        break;
      case 'Onza':
        switch (medidaTemporal.tipoMedida) {
          case 'Libra':
            return this.converter.ofLibraToOnza(cantidad);

          case 'Kilogramo':
            return this.converter.ofKilogramoToOnza(cantidad);

          case 'Gramo':
            return this.converter.ofGramoToOnza(cantidad);
          case 'Onza':
            return cantidad;
        }
        break;
      case 'Litro':
        switch (medidaTemporal.tipoMedida) {
          case 'Litro':
            return cantidad;

          case 'MiliLitro':
            return this.converter.ofMililitroToLitro(cantidad);
        }
        break;
      case 'MiliLitro':
        switch (medidaTemporal.tipoMedida) {
          case 'Litro':
            return this.converter.ofLitroToMililitro(cantidad);

          case 'MiliLitro':
            return cantidad;
        }
        break;
      case 'Unidad':
        return cantidad;
    }
  }
}
