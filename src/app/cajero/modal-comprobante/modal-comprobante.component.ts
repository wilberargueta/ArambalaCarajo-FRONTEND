import { TipoComprobante } from './../../_model/tipo-comprobante';
import { Factura } from './../../_model/factura';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ac-modal-comprobante',
  templateUrl: './modal-comprobante.component.html',
  styleUrls: ['./modal-comprobante.component.scss']
})
export class ModalComprobanteComponent implements OnInit {
  constructor() {}
  @Input()
  mostrarModal = false;

  @Input()
  factura: Factura = new Factura(
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  );
  @Input()
  tipoComprobante: TipoComprobante = new TipoComprobante(null, null);
  ngOnInit() {}
}
