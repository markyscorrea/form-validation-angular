import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormDebugComponent } from '../form-debug/form-debug.component';
import { MsgValidationComponent } from '../msg-validation/msg-validation.component';
import { ApenasNumerosDirective } from '../../diretivas/apenas-numeros.directive';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgbModule,
    FormDebugComponent,
    MsgValidationComponent,
    ApenasNumerosDirective
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  alertFields: boolean = false;

  private formBuilderService = inject(FormBuilder);

  protected form = this.formBuilderService.group({
    nome: ['', Validators.required],
    sobrenome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    genero: ['', Validators.required],
    cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    logradouro: ['', Validators.required],
    bairro: ['', Validators.required],
    cidade: ['', Validators.required],
    complemento: ['']
  })

  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const maxLength = 8;

    if (input.value.length >= maxLength && event.key !== 'Backspace') {
      event.preventDefault();
    }
  }

  validarCampos() {
    if (this.form.valid) {
      console.log('formulário válido')
    } else {
      Object.keys(this.form.controls).forEach(campo => {
        const controle = this.form.get(campo);
        controle?.markAsTouched();
      })
    }

    // this.form.patchValue({
    //   nome: 'Markys',
    //   sobrenome: 'Corrêa'
    // })
  }
}
