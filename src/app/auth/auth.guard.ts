import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const isAuth = this.authService.isAuthenticated();
    console.log('AuthGuard: isAuthenticated() retornou', isAuth);

    if (isAuth) {
      console.log('Usuário autenticado. Permitindo acesso.');
      return true;
    } else {
      console.log('Usuário não autenticado. Redirecionando para login.');
      this.router.navigate(['/login']);
      return false;
    }
  }

}
