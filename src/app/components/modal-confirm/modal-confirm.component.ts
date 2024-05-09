import { Component, EventEmitter, Output, inject } from '@angular/core';
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

  @Output() modalClosed = new EventEmitter();

  fecharModal(){
    this.activeModal.dismiss();
  }

  confirmarExclusao(){
    this.activeModal.dismiss();
    this.modalClosed.emit();
  }
}
