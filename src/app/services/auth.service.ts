import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) { }

  // Método para realizar o login
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:5005/api/auth/login', { username, password }).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token); // Armazena o token
        }
      })
    );
  }

  // Armazena o token no localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Obtém o token do localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Remove o token do localStorage (logout)
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']); // Redireciona para a página de login
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    console.log('Token:', token); // Verifique no console se o token está sendo retornado
    return !!token;
  //return !!this.getToken();
  }
}
