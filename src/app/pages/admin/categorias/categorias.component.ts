import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserResponse } from '@app/shared/models/user.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoriasService } from '../services/categorias.service';
import { ModalFormularioComponent } from './modal-formulario/modal-formulario.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<any>();

  displayedColumns: string[] = [
    'nombreCategoria',
    'nombreTipo',
    'descripcion',
    'editar',
    'eliminar'
  ];
  lstUsers: UserResponse[] = [];

  constructor(private categoriasSvc: CategoriasService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.categoriasSvc.lista()
    .pipe(takeUntil(this.destroy$))
    .subscribe(users => this.lstUsers = users);
  }

  onOpenModal(user = {}): void {
    const dialogRef = this.dialog.open(ModalFormularioComponent, {
      disableClose: true,
      data: {title: 'Nuevo usuario', user}
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
