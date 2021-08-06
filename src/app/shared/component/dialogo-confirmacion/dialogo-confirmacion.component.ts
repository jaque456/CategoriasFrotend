
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-confirmacion',
  templateUrl: './dialogo-confirmacion.component.html',
  styleUrls: ['./dialogo-confirmacion.component.scss']
})
export class DialogoConfirmacionComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogoConfirmacionComponent>, @Inject(MAT_DIALOG_DATA) public message: void) { }

  ngOnInit(): void {
  }
  onOpenDialog(value: boolean): void{
    this.dialogRef.close(value);
  }


}
