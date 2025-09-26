import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-disclamer-dialog',
  imports: [MatButtonModule],
  templateUrl: './disclamer-dialog.html',
  styleUrl: './disclamer-dialog.scss'
})
export class DisclamerDialog {
  readonly dialogRef = inject(MatDialogRef<DisclamerDialog>)
  close(success ?: boolean){
    this.dialogRef.close(success)
  }

}
