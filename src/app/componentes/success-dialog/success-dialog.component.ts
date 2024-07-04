import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  template: `
    <h2 mat-dialog-title>Éxito</h2>
    <mat-dialog-content>El personaje ha sido guardado exitosamente.</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="close()">Continuar</button>
    </mat-dialog-actions>
  `
})
export class SuccessDialogComponent {
  constructor(private dialogRef: MatDialogRef<SuccessDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
