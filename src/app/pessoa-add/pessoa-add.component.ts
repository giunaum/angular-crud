import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-pessoa-add',
  templateUrl: './pessoa-add.component.html',
  styleUrls: ['./pessoa-add.component.scss']
})
export class PessoaAddComponent implements OnInit {

  pessoaForm: FormGroup;
  nome: string = '';
  idade: number = null;
  isResultado = false;
  duracaoMensagem = 5000;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.pessoaForm = this.formBuilder.group({
      'nome': [null, Validators.required],
      'idade': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.isResultado = true;
    this.api.salvarPessoa(form)
      .subscribe(res => {
        let id = res['id'];
        this.isResultado = false;
        this.router.navigate(['/pessoa-details', id]);
        this.snackBar.open(`${res['nome']} adicionado(a) com sucesso!`, undefined, {
          duration: this.duracaoMensagem
        });
      }, (err) => {
        console.log(err);
        this.isResultado = false;
        this.snackBar.open('Falha ao adicionar a pessoa!', undefined, {
          duration: this.duracaoMensagem
        });
      });
  }
}
