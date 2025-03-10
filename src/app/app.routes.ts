import { Routes } from '@angular/router';
import { ListaFuncionariosComponent } from './funcionarios/lista-funcionarios/lista-funcionarios.component';
import { CadastroFuncionarioComponent } from './funcionarios/cadastro-funcionario/cadastro-funcionario.component';
import { DetalhesFuncionarioComponent } from './funcionarios/detalhes-funcionario/detalhes-funcionario.component';

export const routes: Routes = [
  { path: '', redirectTo: '/funcionarios', pathMatch: 'full' }, // Rota padrão
  { path: 'funcionarios', component: ListaFuncionariosComponent },
  { path: 'funcionarios/cadastro', component: CadastroFuncionarioComponent },
  { path: 'funcionarios/detalhes/:id', component: DetalhesFuncionarioComponent }
];
