import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-funcionarios',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './lista-funcionarios.component.html',
  styleUrls: ['./lista-funcionarios.component.scss']
})
export class ListaFuncionariosComponent implements OnInit {
  funcionarios: any[] = [];

  constructor(
    private funcionarioService: FuncionarioService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  carregarFuncionarios(): void {
    this.funcionarioService.getFuncionarios().subscribe(
      data => {
        console.log('Dados recebidos da API:', data); 
        this.funcionarios = data;
      },
      error => {
        this.snackBar.open('Erro ao carregar funcionários', 'Fechar', { duration: 3000 });
      }
    );
  }
  novoFuncionario(): void {
    this.router.navigate(['/funcionarios/cadastro']);
  }
  editarFuncionario(id: number): void {
    this.router.navigate(['/funcionarios/editar', id]);
  }
  excluirFuncionario(id: number): void {
    this.funcionarioService.deleteFuncionario(id).subscribe(
      () => {
        this.snackBar.open('Funcionário excluído com sucesso', 'Fechar', { duration: 3000 });
        this.carregarFuncionarios();
      },
      error => {
        this.snackBar.open('Erro ao excluir funcionário', 'Fechar', { duration: 3000 });
      }
    );
  }
}
