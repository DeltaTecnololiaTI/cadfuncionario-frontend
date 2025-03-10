import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Telefone } from '../../models/telefone.model';


@Component({
  selector: 'app-cadastro-funcionario',
  standalone: true,
  imports: [
    ReactiveFormsModule ,
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule
  ],
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.scss']
})
export class CadastroFuncionarioComponent implements OnInit {
  funcionarioForm: FormGroup;
  isEdicao = false;
  funcionarioId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.funcionarioForm = this.fb.group({
      funcionarioId: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      documento: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cargoId: ['', Validators.required],
      gestorId: [''],
      senhaHash: ['', Validators.required],
      telefones: this.fb.array([]) // Array para múltiplos telefones
    });
  }

  // Getter para acessar o FormArray de telefones
  get telefones(): FormArray {
    return this.funcionarioForm.get('telefones') as FormArray;
  }

  // Método para adicionar um novo telefone
  adicionarTelefone(): void {
    this.telefones.push(this.criarGrupoTelefone());
  }

  // Método para criar um grupo de telefone
  criarGrupoTelefone(): FormGroup {
    return this.fb.group({
      numero: ['', Validators.required],
      tipo: ['', Validators.required]
    });
  }

  // Método para remover um telefone
  removerTelefone(index: number): void {
    this.telefones.removeAt(index);
  }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdicao = true;
      this.funcionarioId = +id;
      this.carregarFuncionario(this.funcionarioId);
    }else {
      this.adicionarTelefone();
    }

  }

  voltar(): void {
    this.router.navigate(['/funcionarios']);
  }

  carregarFuncionario(id: number): void {
    this.funcionarioService.getFuncionario(id).subscribe(
      data => {
        this.funcionarioForm.patchValue({
          funcionarioId: data.funcionarioId, // Preenche o campo funcionarioId
          nome: data.nome,
          sobrenome: data.sobrenome,
          email: data.email,
          documento: data.documento,
          dataNascimento: data.dataNascimento,
          cargoId: data.cargoId,
          gestorId: data.gestorId
         });

        // Preenche o FormArray de telefones
        if (data.telefones && data.telefones.length > 0) {
          data.telefones.forEach((telefone:Telefone) => {
            this.telefones.push(this.fb.group({
              telefoneId: telefone.telefoneId,
              funcionarioId: telefone.funcionarioId,
              numero: telefone.numero,
              tipo: telefone.tipo
            }));
          });
        } else {
          this.adicionarTelefone(); // Adiciona um telefone se não houver
        }

    },
      error => {
        this.snackBar.open('Erro ao carregar funcionário', 'Fechar', { duration: 3000 });
      }
    );
  }

  salvarFuncionario(): void {
    console.log('Método salvarFuncionario chamado');
    if (this.funcionarioForm.invalid) {
      console.error('Formulário inválido:', this.funcionarioForm.value);
      return;
    }

    const funcionario = this.funcionarioForm.value;
    // Atualiza o funcionarioId nos telefones
    funcionario.telefones = funcionario.telefones.map((telefone: any) => ({
      ...telefone,
      funcionarioId: this.funcionarioId || 0
    }));

    console.log('Dados do funcionário:', funcionario);

    if (!this.isEdicao) {
      delete funcionario.funcionarioId;
    }

    if (this.isEdicao && this.funcionarioId) {
      this.funcionarioService.updateFuncionario(this.funcionarioId, funcionario).subscribe(
        () => {
          this.snackBar.open('Funcionário atualizado com sucesso', 'Fechar', { duration: 3000 });
          this.router.navigate(['/funcionarios']);
        },
        error => {
          console.error('Erro ao atualizar funcionário:', error);
          this.snackBar.open('Erro ao atualizar funcionário', 'Fechar', { duration: 3000 });
        }
      );
    } else {
      this.funcionarioService.addFuncionario(funcionario).subscribe(
        () => {
          this.snackBar.open('Funcionário cadastrado com sucesso', 'Fechar', { duration: 3000 });
          this.router.navigate(['/funcionarios']);
        },
        error => {
          this.snackBar.open('Erro ao cadastrar funcionário', 'Fechar', { duration: 3000 });
        }
      );
    }
  }
}
