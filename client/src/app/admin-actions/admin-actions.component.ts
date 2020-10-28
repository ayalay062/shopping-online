import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.css']
})
export class AdminActionsComponent {

  @Input() selectedProduct;

 

  isAdding=false;

  startAdding() {
    this.isAdding=true;
    this.selectedProduct=undefined;
  }

  stopAdding() {
  this.isAdding=false;
  }


}
