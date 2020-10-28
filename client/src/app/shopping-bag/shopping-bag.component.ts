import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IState } from '../app.module'
import { ISelectedProducts } from 'src/models/selectedProducts.model';
import { Router } from '@angular/router';
import { removeFromBag } from '../store/actions/bag.actions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.css']
})
export class ShoppingBagComponent implements OnInit {
  bagProducts$: Observable<ISelectedProducts[]>;
  products: ISelectedProducts[];
  isOpen: boolean;
  @Input() disChanges: boolean;
  total: number=0;
  searchText = '';
  showBagProduct = true;
  isModal = false;
  constructor(private state: Store<IState>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ShoppingBagComponent>) { }

  ngOnInit(): void {
    this.state.select(state => {
      if (state.bag.bag) {
        return state.bag.bag;
      }
    }).subscribe({ next: bag => {
      if (bag) {
        this.products = bag?.products;
        this.total=0;
        if (bag?.products) this.products.forEach(p => this.total+=p.qty * p.productId.price);
      }
    }});
  
    if (this.data && this.data.modal === true) {
      this.isModal =true;
    }

  }
  close() {
  if(this.dialogRef){
    this.dialogRef.close({ data: 'Order' });
  }
   
  }
  goToOrder(): void {
    this.router.navigateByUrl('/order');
    this.close();
  }

  deleteAll() {
    this.state.dispatch(removeFromBag({ bagId: this.products[0].bagId, productIds: this.products.map(p => p._id)}))
  }
}
