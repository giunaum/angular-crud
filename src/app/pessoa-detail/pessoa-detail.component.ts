import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {Pessoa} from '../pessoa';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-pessoa-detail',
  templateUrl: './pessoa-detail.component.html',
  styleUrls: ['./pessoa-detail.component.scss']
})
export class PessoaDetailComponent implements OnInit {

  pessoa: Pessoa = {id: null, nome: '', idade: null};
  isResultado = true;
  duracaoMensagem = 5000;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.getDetalhePessoa(this.route.snapshot.params['id']);
  }

  getDetalhePessoa(id) {
    this.api.getPessoaById(id)
      .subscribe(data => {
        this.pessoa = data;
        console.log(this.pessoa);
        this.isResultado = false;
      });
  }

  apagarPessoa(id) {
    this.isResultado = true;
    this.api.excluirPessoa(id)
      .subscribe(res => {
          this.isResultado = false;
          this.router.navigate(['/pessoas']);
          this.snackBar.open(`Pessoa com ID ${res} foi excluído com sucesso!`, undefined, {
            duration: this.duracaoMensagem
          });
        }, (err) => {
          console.log(err);
          this.isResultado = false;
          this.snackBar.open('Falha ao excluir a pessoa!', undefined, {
            duration: this.duracaoMensagem
          });
        }
      );
  }
}
