import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco } from '../interface/endereco.interface';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  buscar(cep: string | null | undefined){
    return this.http.get<Endereco>(`https://viacep.com.br/ws/${cep}/json/`);
  }

}
