import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormDebugComponent } from '../form-debug/form-debug.component';
import { MsgValidationComponent } from '../msg-validation/msg-validation.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgbModule,
    FormDebugComponent,
    MsgValidationComponent
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  alertFields: boolean = false;
  
  private formBuilderService = inject(FormBuilder);
  
  protected form = this.formBuilderService.group({
    nome: ['', Validators.required],
    sobrenome: ['', Validators.required]
  })


  validarCampos(){

  }
}
