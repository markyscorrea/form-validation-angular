import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { Pessoa } from './interface/pessoa.interface';

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
  eventoRecebidoVisualizacao: Pessoa;

  receberEventoCadastro(e: boolean){
    this.eventoRecebidoCadastro = !this.eventoRecebidoCadastro;
  }

  receberEventoVisualizacao(p: Pessoa){
    this.eventoRecebidoVisualizacao = p;
  }
}
