import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule  } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-detalhes-funcionario',
  standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule
    ],
  templateUrl: './detalhes-funcionario.component.html',
  styleUrls: ['./detalhes-funcionario.component.scss']
})
export class DetalhesFuncionarioComponent implements OnInit {
  funcionario: any;

  constructor(
    private route: ActivatedRoute,
    private funcionarioService: FuncionarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarFuncionario(+id);
    }
  }

  carregarFuncionario(id: number): void {
    this.funcionarioService.getFuncionario(id).subscribe(
      data => {
        this.funcionario = data;
      },
      error => {
        this.snackBar.open('Erro ao carregar detalhes do funcionário', 'Fechar', { duration: 3000 });
      }
    );
  }
}
