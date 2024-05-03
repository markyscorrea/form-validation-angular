import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from '../interface/estado-br.interface';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  private url: string = 'assets/estados.json';

  constructor(private http: HttpClient) { }

  getEstados(){
    return this.http.get<EstadoBr[]>(this.url);
  }
}
