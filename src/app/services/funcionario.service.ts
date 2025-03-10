import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiUrl = 'http://localhost:5005/api/funcionario';

  constructor(private http: HttpClient) { }

  // Obter todos os funcionários
  getFuncionarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}`).pipe(
      catchError(error => {
        console.error('Erro na requisição delete:', error);
        throw error;
      }));
  }

  // Obter um funcionário por ID
  getFuncionario(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Adicionar um novo funcionário
  addFuncionario(funcionario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, funcionario);
  }

  // Atualizar um funcionário existente
  updateFuncionario(id: number, funcionario: any): Observable<any> {
    console.log('URL da requisição:', `${this.apiUrl}/${id}`);
    console.log('Dados enviados:', funcionario);

    return this.http.put(`${this.apiUrl}/${id}`, funcionario).pipe(
      catchError(error => {
        console.error('Erro na requisição:', error);
        throw error;
      }));
  }

  // Excluir um funcionário
  deleteFuncionario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Erro na requisição delete:', error);
        throw error;
      }));
  }
}
