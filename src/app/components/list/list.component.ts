import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { PessoaService } from '../../servicos/pessoa.service';
import { Pessoa } from '../../interface/pessoa.interface';
import { AsyncPipe } from '@angular/common';
import { NgbModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImgVazioComponent } from '../img-vazio/img-vazio.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgbModule,
    ImgVazioComponent,
    ModalConfirmComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  private pessoaService = inject(PessoaService);
  private modalService = inject(NgbModal);
  private modalRef: NgbModalRef;

  //pessoas$ = new Observable<Pessoa[]>();

  pessoas: Pessoa[] = [];

  @Input() eventoCadastro: boolean = false;
  @Output() visualizarCadastroPessoa = new EventEmitter();

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

  visualizarPessoa(pessoa: Pessoa){
    this.visualizarCadastroPessoa.emit({pessoa: pessoa, status: true});
  }

  removerPessoa(id: string | number){
    this.pessoaService.deletar(id).subscribe(_ => {
      this.buscarPessoas();
    });
  }

  abrirModal(id: string | number){
    this.modalRef = this.modalService.open(ModalConfirmComponent, {
      size: 'sm',
      centered: true
    });
    
    this.modalRef.componentInstance.tituloModal = 'Confirmar Exclusão';
    this.modalRef.componentInstance.descricaoBtn = 'Excluir';
    this.modalRef.componentInstance.corBtn = 'danger';
    this.modalRef.componentInstance.modalClosed.subscribe(() => {
      this.removerPessoa(id);
    })
  }
}
