import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Pessoa} from './pessoa';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrlPessoa = 'http://localhost:8080/pessoas';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(apiUrlPessoa)
      .pipe(
        catchError(err => {
          return of(err);
        })
      );
  }

  getPessoaById(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${apiUrlPessoa}/${id}`)
      .pipe(
        catchError(err => {
          return of(err);
        })
      );
  }

  salvarPessoa(pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(apiUrlPessoa, pessoa, httpOptions)
      .pipe(
        catchError(err => {
          return of(err);
        })
      );
  }

  excluirPessoa(id: number): Observable<number> {
    console.log(`${apiUrlPessoa}/${id}`);
    return this.http.delete<number>(`${apiUrlPessoa}/${id}`, httpOptions)
      .pipe(
        catchError(err => {
          return of(err);
        })
      );
  }
}
