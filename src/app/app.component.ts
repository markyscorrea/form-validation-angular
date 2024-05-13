import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { Pessoa } from './interface/pessoa.interface';
import { PessoaEdicao } from './interface/edicao.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormComponent,
    ListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'form-validation';

  eventoRecebidoCadastro: boolean = false;
  eventoRecebidoVisualizacao: PessoaEdicao;

  receberEventoCadastro(e: boolean){
    this.eventoRecebidoCadastro = !this.eventoRecebidoCadastro;
  }

  receberEventoVisualizacao(valor: PessoaEdicao){
    this.eventoRecebidoVisualizacao = valor;
  }
}
