import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.css']
})
export class AdminActionsComponent implements OnInit {

  @Input() selectedProduct;

  constructor() { }

  isAdding=false;

  startAdding() {
    this.isAdding=true;
    this.selectedProduct=undefined;
  }

  stopAdding() {
  this.isAdding=false;
  }

  ngOnInit(): void {
  }

}
