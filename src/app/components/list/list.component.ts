import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { PessoaService } from '../../servicos/pessoa.service';
import { Pessoa } from '../../interface/pessoa.interface';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImgVazioComponent } from '../img-vazio/img-vazio.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgbModule,
    ImgVazioComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  private pessoaService = inject(PessoaService);

  //pessoas$ = new Observable<Pessoa[]>();

  pessoas: Pessoa[] = [];
  animacaoAtivaVisualizar: boolean = false;
  animacaoAtivaEditar: boolean = false;
  animacaoAtivaExcluir: boolean = false;

  @Input() eventoCadastro: boolean = false;

  ngOnInit(){
    this.buscarPessoas();
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['eventoCadastro']){
      this.buscarPessoas();
      this.eventoCadastro = false;
    }
  }

  buscarPessoas(){
    //this.pessoas$ = this.pessoaService.buscar();

    this.pessoaService.buscar().subscribe(p => this.pessoas = p);
  }

  removerPessoa(id: string | number){
    this.pessoaService.deletar(id).subscribe(_ => this.buscarPessoas());
  }

  ativarAnimacao(btn: string) {
    if(btn === 'visualizar'){
      this.animacaoAtivaVisualizar = true;
    } else if(btn === 'editar'){
      this.animacaoAtivaEditar = true;
    } else if(btn === 'excluir'){
      this.animacaoAtivaExcluir = true;
    }
  }

  desativarAnimacao(btn: string) {
    if(btn === 'visualizar'){
      this.animacaoAtivaVisualizar = false;
    } else if(btn === 'editar'){
      this.animacaoAtivaEditar = false;
    } else if(btn === 'excluir'){
      this.animacaoAtivaExcluir = false;
    }
  }
}
