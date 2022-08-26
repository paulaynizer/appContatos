import { Injectable } from '@angular/core';
import { Contato } from '../models/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private _contatos: Contato[] = []

  constructor() { 
    let contato = new Contato("Teste", 99836112,"feminino", "1985-12-20");
    this.inserir(contato);
  }

  public get contatos(): Contato[]{
    return this._contatos;
  }

  public inserir(contato : Contato){
    this._contatos.push(contato);
  }
}
