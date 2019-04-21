import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Pessoa } from '../pessoa';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent implements OnInit {

  colunas: string[] = ['id', 'nome', 'idade'];
  data: Pessoa[] = [];
  isResultado = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getPessoas()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.isResultado = false;
      }, err => {
        console.log(err);
        this.isResultado = false;
      });
  }
}
