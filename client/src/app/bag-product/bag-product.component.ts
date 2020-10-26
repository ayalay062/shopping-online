import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  Inject,
} from '@angular/core';
import { IBagProduct } from '../store/reducers/products.reducer';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { IProduct } from 'src/models/product.model';
import { changeQty, removeFromBag } from '../store/actions/bag.actions';
import { ISelectedProducts } from 'src/models/selectedProducts.model';

@Component({
  selector: 'app-bag-product',
  templateUrl: './bag-product.component.html',
  styleUrls: ['./bag-product.component.css'],
})
export class BagProductComponent implements OnInit {
  @Input() product: ISelectedProducts;
  @Input() searchText: string;
  @Input() disChanges: boolean;
  

  constructor(private store: Store<IState>) {}

  ngOnInit(): void {
   
  }

  changeQty(newQty) {
    this.store.dispatch(
      changeQty({ product: { ...this.product, qty: newQty } })
    );
  }

  remove() {
    this.store.dispatch(
      removeFromBag({
        bagId: this.product.bagId,
        productIds: [this.product._id],
      })
    );
  }
}
