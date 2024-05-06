import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../interface/pessoa.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private url = `${environment}/pessoas`;

  constructor(private http: HttpClient) { }

  cadastrar(pessoa: Pessoa){

  }
}
