import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-msg-validation',
  standalone: true,
  imports: [],
  templateUrl: './msg-validation.component.html',
  styleUrl: './msg-validation.component.scss'
})
export class MsgValidationComponent {

  @Input() campo = '';

}
