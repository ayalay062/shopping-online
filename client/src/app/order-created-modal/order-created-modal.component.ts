import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISelectedProducts } from 'src/models/selectedProducts.model';
import { IState } from '../app.module';

@Component({
  selector: 'app-order-created-modal',
  templateUrl: './order-created-modal.component.html',
  styleUrls: ['./order-created-modal.component.css']
})
export class OrderCreatedModalComponent implements OnInit {
  @Input() show;
  @Input() receipt;
  @Output() closeModal=new EventEmitter();
  
  constructor(private store: Store<IState>) { }
  
  ngOnInit(): void {
  }
  
  close() {
    this.closeModal.emit();
  }

  generateReceipt() {
    const printContent = this.receipt;
    var win = window.open('', 'printwindow', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    
    // Make sure the relative URL to the stylesheet works:
    win.document.write('<base href="' + location.origin + location.pathname + '">');
    
    // Add the stylesheet link and inline styles to the new document:
    // new change
    win.document.write('<link rel="stylesheet" href="./cash-register.component.scss">');
    win.document.write('<style type="text/css">.style1{width: 100%;}</style>');
    win.document.write( printContent);
    win.document.write('</body></html>');
    win.print();
    win.close();
  }
}
