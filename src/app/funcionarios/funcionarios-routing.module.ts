import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ListaFuncionariosComponent } from './lista-funcionarios/lista-funcionarios.component';
import { CadastroFuncionarioComponent } from './cadastro-funcionario/cadastro-funcionario.component';
import { DetalhesFuncionarioComponent } from './detalhes-funcionario/detalhes-funcionario.component';

const routes: Routes = [
  { path: '', component: ListaFuncionariosComponent }, // Rota padrão
  { path: 'cadastro', component: CadastroFuncionarioComponent },
  { path: 'editar/:id', component: CadastroFuncionarioComponent },
  { path: 'detalhes/:id', component: DetalhesFuncionarioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes),ReactiveFormsModule],
  exports: [RouterModule]
})
export class FuncionariosRoutingModule { }
