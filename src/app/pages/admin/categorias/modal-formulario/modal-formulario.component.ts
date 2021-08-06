import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriasService } from '../../services/categorias.service';
import { AuthService } from '@app/pages/auth/auth.service';
import { Tipo } from '@app/shared/models/tipo.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
enum Action{
  EDIT = "edit",
  NEW = "new"
}

@Component({
  selector: 'app-modal-formulario',
  templateUrl: './modal-formulario.component.html',
  styleUrls: ['./modal-formulario.component.scss']
})

export class ModalFormularioComponent implements OnInit, OnDestroy {

  // Variables
  actionTODO = Action.NEW;
  private destroy$ = new Subject<any>();
  tipos : Tipo[] = [];

  categoriaForm = this.fb.group({
    cveCategoria: [''],
    cveRegistro : [this.authSvc.userValue?.cveUsuario],
    nombreCategoria : ['', [Validators.required]],
    descripcion : ['', [Validators.required]],
    tipo:['',[Validators.required]]
    
  })

  constructor(public dialogRef: MatDialogRef<ModalFormularioComponent> ,@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private categoriasSvc: CategoriasService, private _snackBar: MatSnackBar, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.getTipos();
    if(this.data?.user.hasOwnProperty("cveCategoria")){
      this.actionTODO = Action.EDIT;
      this.data.title = "Editar Categoria",
      this.categoriaForm.updateValueAndValidity();
      this.editar();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete()
  }

  private getTipos(): void {
    this.categoriasSvc.getTipos()
    .pipe(takeUntil(this.destroy$))
    .subscribe(tipos => this.tipos = tipos)
  }

  onSave(): void{
    if(this.categoriaForm.invalid){
      return;
    }

    const formValue = this.categoriaForm.value;

    if(this.actionTODO == Action.NEW) {
      // Insert
      const { cveCategoria, ...rest } = formValue
      this.categoriasSvc.new(rest)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this._snackBar.open(result.message, '', {
          duration: 6000
        });
        this.dialogRef.close(true);
      });
    } else {
      // Update
      const { ...rest } = formValue;
      this.categoriasSvc.update(rest)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this._snackBar.open(result.message, '', {
          duration: 6000
        });
        this.dialogRef.close(true);  
      });
    }

    console.log(this.categoriasSvc);
  }  
  private editar(): void {
    this.categoriaForm.patchValue({
      cveCategoria : this.data?.user.cveCategoria,
      nombreCategoria : this.data?.user.nombreCategoria,
      descripcion : this.data?.user.descripcion,
      tipo : this.data?.user.tipo,
      cveRegistro: this.data?.user.cveUsuario
    });
  }


  getErrorMessage(field: string): string{
    let message = "";

    const element = this.categoriaForm.get(field);

    if(element?.errors){
      const messages: any = {
        required : "Este campo es requerido"
      };

      const errorKey = Object.keys(element?.errors).find(Boolean);
      message = String(messages[String(errorKey)]);
    }

    return message;
  }

}