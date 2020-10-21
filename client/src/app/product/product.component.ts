import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/models/product.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import {deleteProduct,editProduct} from '../store/actions/products.actions'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() id: string; updute:{};
 
  item$: Observable<IProduct>;

  constructor(private store: Store<IState>) { }

  ngOnInit(): void {
    this.item$ = this.store.select(state => state.items.products.find(i => i._id === this.id));
  }

  edit() {
    this.store.dispatch(editProduct({ productId: this.id,update: this.updute }));
  }

  delete() {
    this.store.dispatch(deleteProduct({ productId: this.id }));
  }

}
