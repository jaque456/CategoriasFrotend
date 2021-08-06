import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserResponse } from '@app/shared/models/user.interface';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoConfirmacionComponent } from '@app/shared/component/dialogo-confirmacion/dialogo-confirmacion.component';
import { takeUntil } from 'rxjs/operators';
import { CategoriasService } from '../services/categorias.service';
import { AuthService } from '@app/pages/auth/auth.service';
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
  constructor(private categoriasSvc: CategoriasService, private dialog: MatDialog, private _snackbar: MatSnackBar, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.listCategorias();
  }
  private listCategorias(): void{
   const result = this.authSvc.userValue?.username!;
    this.categoriasSvc.lista(result)
    .pipe(takeUntil(this.destroy$))
    .subscribe(users => this.lstUsers = users);
  }

  onOpenModal(user = {}): void {
    const dialogRef = this.dialog.open(ModalFormularioComponent, {
      disableClose: true,
      data: {title: 'Nuevo usuario', user}
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      if(result){
        this.listCategorias();
      }
    }); }
    onDelete(cveCategoria: number) {
      this.dialog.open(DialogoConfirmacionComponent, {
        disableClose: true,
        data: "Estas seguro de querer eliminarlo"
      }).beforeClosed()
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          if (result) {
            this.categoriasSvc.delete(cveCategoria)
              .pipe(takeUntil(this.destroy$))
              .subscribe(result => {
                if (result) {
                  this._snackbar.open(result.message, '', {
                    duration: 6000
                  });
                  this.listCategorias();
                }
              });
          }
        })
    }
  
    ngOnDestroy(): void {
      this.destroy$.next({});
      this.destroy$.complete();
    }
  }