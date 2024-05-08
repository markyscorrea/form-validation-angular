import { Component, Input, SimpleChanges, ViewChild, inject } from '@angular/core';
import { PessoaService } from '../../servicos/pessoa.service';
import { Pessoa } from '../../interface/pessoa.interface';
import { AsyncPipe } from '@angular/common';
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
  private idPessoa: string | number;

  //pessoas$ = new Observable<Pessoa[]>();

  pessoas: Pessoa[] = [];

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

  setarIdPessoa(id: string | number){
    this.idPessoa = id;
  }

  removerPessoa(){
    this.pessoaService.deletar(this.idPessoa).subscribe(_ => {
      this.buscarPessoas();
    });
  }
}
