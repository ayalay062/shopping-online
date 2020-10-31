import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from '../create-product/create-product.component';

@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.css'],
})
export class AdminActionsComponent {
  constructor(private dialog: MatDialog) {



  }

  isAdding = false;

  startAdding() {
    this.isAdding = true;
      this.openDialogBasket();
  }

  stopAdding() {
    this.isAdding = false;
  }
  openDialogBasket() {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      data: { selectedProduct: undefined},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.afterClosed().subscribe((result) => {
     this.stopAdding();
    });
  }
}
