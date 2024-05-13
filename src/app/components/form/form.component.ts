import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
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
import { PessoaService } from '../../servicos/pessoa.service';
import { Pessoa } from '../../interface/pessoa.interface';
import { PessoaEdicao } from '../../interface/edicao.interface';

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

  @Input() eventoVisualizacao: PessoaEdicao;
  @Output() cadastrouPessoa = new EventEmitter();

  private formBuilderService = inject(FormBuilder);
  private dropDownService = inject(DropdownService);
  private consultaCep = inject(ConsultaCepService);
  private pessoaService = inject(PessoaService);
  public telaEdicao: boolean = false;
  public idPessoaEdicao: number | string;

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
    uf: ['', [Validators.required]],
    ativo: [true, Validators.required]
  })

  ngOnInit() {
    this.estados$ = this.dropDownService.getEstados();
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['eventoVisualizacao']){
      this.form.patchValue(this.eventoVisualizacao?.pessoa);
      this.idPessoaEdicao = this.eventoVisualizacao?.pessoa.id!;
      this.telaEdicao = this.eventoVisualizacao?.pessoa.ativo;
    }
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

    if (this.form.valid && !this.telaEdicao) {
      this.cadastrarPessoa();
    } else if (this.form.valid && this.telaEdicao) {
      this.editarPessoa();
    } else {
      Object.keys(this.form.controls).forEach(campo => {
        const controle = this.form.get(campo);
        controle?.markAsTouched();
      })
    }
  }

  cadastrarPessoa(){
    const pessoa = this.form.value as Pessoa;
    this.pessoaService.cadastrar(pessoa).subscribe(_ => {
      this.form.reset();
      this.form.controls.ativo.setValue(true);
      this.cadastrouPessoa.emit(true);
    })
  }

  editarPessoa(){
    const pessoa = this.form.value as Pessoa;
    this.pessoaService.editar(pessoa, this.idPessoaEdicao).subscribe(_ => {
      this.form.reset();
      this.form.controls.ativo.setValue(true);
      this.cadastrouPessoa.emit(true);
      this.telaEdicao = !this.telaEdicao;
    })
  }

  limparForm(){
    this.form.reset();
    this.form.controls.ativo.setValue(true);
    this.telaEdicao = false;
    this.idPessoaEdicao = '';
    if(this.telaEdicao) this.eventoVisualizacao.status = false;
  }
}
