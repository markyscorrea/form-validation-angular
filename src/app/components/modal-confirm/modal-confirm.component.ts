import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [],
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.scss'
})
export class ModalConfirmComponent {

  public activeModal = inject(NgbActiveModal);

  @Input() tituloModal: string;
  @Input() descricaoBtn: string;
  @Input() corBtn: string;
  @Output() modalClosed = new EventEmitter();

  fecharModal(){
    this.activeModal.dismiss();
  }

  confirmar(){
    this.activeModal.dismiss();
    this.modalClosed.emit();
  }
}
