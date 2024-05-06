import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormDebugComponent } from '../form-debug/form-debug.component';
import { MsgValidationComponent } from '../msg-validation/msg-validation.component';
import { ApenasNumerosDirective } from '../../diretivas/apenas-numeros.directive';
import { DropdownService } from '../../servicos/dropdown.service';
import { EstadoBr } from '../../interface/estado-br.interface';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ConsultaCepService } from '../../servicos/consulta-cep.service';
import { Endereco } from '../../interface/endereco.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgbModule,
    FormDebugComponent,
    MsgValidationComponent,
    ApenasNumerosDirective,
    AsyncPipe
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  estados$ = new Observable<EstadoBr[]>();

  private formBuilderService = inject(FormBuilder);
  private dropDownService = inject(DropdownService);
  private consultaCep = inject(ConsultaCepService);

  protected form = this.formBuilderService.group({
    nome: ['', Validators.required],
    sobrenome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    genero: ['', Validators.required],
    cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    logradouro: ['', Validators.required],
    numero: ['', Validators.required],
    bairro: ['', Validators.required],
    cidade: ['', Validators.required],
    complemento: [''],
    uf: ['', [Validators.required]]
  })

  ngOnInit() {
    this.estados$ = this.dropDownService.getEstados();
  }

  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const maxLength = 8;

    if (input.value.length >= maxLength && event.key !== 'Backspace') {
      event.preventDefault();
    }
  }

  buscarCep() {
    this.consultaCep.buscar(this.form.value.cep)
      .subscribe((cep: Endereco) => {
        this.form.patchValue({
          logradouro: cep.logradouro,
          bairro: cep.bairro,
          cidade: cep. localidade,
          uf: cep.uf
        })
      });
  }

  validarCampos() {

    if (this.form.valid) {
      console.log('formulário válido')
      console.log(this.form.value);
    } else {
      Object.keys(this.form.controls).forEach(campo => {
        const controle = this.form.get(campo);
        controle?.markAsTouched();
      })
    }
  }
}
