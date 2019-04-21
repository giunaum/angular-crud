import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-pessoa-edit',
  templateUrl: './pessoa-edit.component.html',
  styleUrls: ['./pessoa-edit.component.scss']
})
export class PessoaEditComponent implements OnInit {

  pessoaForm: FormGroup;
  id: number = null;
  nome: string = '';
  idade: number = null;
  isResultado = false;
  duracaoMensagem = 5000;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getPessoa(this.route.snapshot.params['id']);
    this.pessoaForm = this.formBuilder.group({
      'id': [null, Validators.required],
      'nome': [null, Validators.required],
      'idade': [null, Validators.required]
    });
  }

  getPessoa(id) {
    this.api.getPessoaById(id).subscribe(data => {
      this.id = data.id;
      this.pessoaForm.setValue({
        id: data.id,
        nome: data.nome,
        idade: data.idade
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.isResultado = true;
    this.api.salvarPessoa(form)
      .subscribe(res => {
          let id = res['id'];
          this.isResultado = false;
          this.router.navigate(['/pessoa-details', id]);
          this.snackBar.open(`${res['nome']} atualizado(a) com sucesso!`, undefined, {
            duration: this.duracaoMensagem
          });
        }, (err) => {
          console.log(err);
          this.isResultado = false;
          this.snackBar.open('Falha ao atualizar a pessoa!', undefined, {
            duration: this.duracaoMensagem
          });
        }
      );
  }

  detalhePessoa() {
    this.router.navigate(['/pessoa-details', this.id]);
  }
}
