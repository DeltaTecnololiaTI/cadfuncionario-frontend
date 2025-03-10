import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Injeta o AuthService
  const token = authService.getToken(); // Obtém o token
  console.log('Interceptor: Token encontrado?', token); 
  if (token) {
    // Adiciona o token no cabeçalho da requisição
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
