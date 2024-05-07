import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { PessoaService } from '../../servicos/pessoa.service';
import { Pessoa } from '../../interface/pessoa.interface';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  private pessoaService = inject(PessoaService);

  pessoas$ = new Observable<Pessoa[]>();

  @Input() eventoCadastro: boolean = false;

  ngOnInit(){
    this.buscarPessoas();
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['eventoCadastro'] && changes['eventoCadastro'].currentValue){
      this.buscarPessoas()
    }
  }

  buscarPessoas(){
    this.pessoas$ = this.pessoaService.buscar();
  }

}
