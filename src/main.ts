import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { AuthGuard } from './app/auth/auth.guard';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redireciona para o login por padrão
  { path: 'funcionarios', loadComponent: () => import('./app/funcionarios/lista-funcionarios/lista-funcionarios.component').then(m => m.ListaFuncionariosComponent), canActivate: [AuthGuard] },
  { path: 'funcionarios/cadastro', loadComponent: () => import('./app/funcionarios/cadastro-funcionario/cadastro-funcionario.component').then(m => m.CadastroFuncionarioComponent), canActivate: [AuthGuard] },
  { path: 'funcionarios/editar/:id', loadComponent: () => import('./app/funcionarios/cadastro-funcionario/cadastro-funcionario.component').then(m => m.CadastroFuncionarioComponent), canActivate: [AuthGuard] }, 
  { path: 'funcionarios/detalhes/:id', loadComponent: () => import('./app/funcionarios/detalhes-funcionario/detalhes-funcionario.component').then(m => m.DetalhesFuncionarioComponent), canActivate: [AuthGuard] },
  { path: 'login', loadComponent: () => import('./app/auth/login/login.component').then(m => m.LoginComponent) }
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(ReactiveFormsModule),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])), provideAnimationsAsync() // Registra o interceptor
  ]
}).catch(err => console.error(err));
