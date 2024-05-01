import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-debug',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './form-debug.component.html',
  styleUrl: './form-debug.component.scss'
})
export class FormDebugComponent {
  @Input() formulario?: FormGroup;
}
