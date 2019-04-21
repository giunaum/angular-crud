import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoasComponent } from './pessoas/pessoas.component';
import { PessoaDetailComponent } from './pessoa-detail/pessoa-detail.component';
import { PessoaAddComponent } from './pessoa-add/pessoa-add.component';
import { PessoaEditComponent } from './pessoa-edit/pessoa-edit.component';

const routes: Routes = [
  {
    path: 'pessoas',
    component: PessoasComponent,
    data: {title: 'Lista de Pessoas'}
  },
  {
    path: 'pessoa-details/:id',
    component: PessoaDetailComponent,
    data: {title: 'Pessoa'}
  },
  {
    path: 'pessoa-add',
    component: PessoaAddComponent,
    data: {title: 'Adicionar Pessoa'}
  },
  {
    path: 'pessoa-edit/:id',
    component: PessoaEditComponent,
    data: {title: 'Editar Pessoa'}
  },
  {
    path: '',
    redirectTo: '/pessoas',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
