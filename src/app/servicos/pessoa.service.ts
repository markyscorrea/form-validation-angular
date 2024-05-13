import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../interface/pessoa.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private url = `${environment.api}/pessoas`;

  constructor(private http: HttpClient) { }

  buscar(){
    return this.http.get<Pessoa[]>(this.url);
  }

  cadastrar(pessoa: Pessoa){
    return this.http.post<Pessoa>(this.url, pessoa);
  }

  editar(pessoa: Pessoa){
    return this.http.put<Pessoa>(`${this.url}/${pessoa.id}`, pessoa);
  }

  deletar(id: string | number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
