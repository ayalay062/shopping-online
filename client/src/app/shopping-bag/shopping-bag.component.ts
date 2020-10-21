import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IState } from '../app.module'
import { ISelectedProducts } from 'src/models/selectedProducts.model';
import { Router } from '@angular/router';
import { removeFromBag } from '../store/actions/bag.actions';

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
  constructor(private state: Store<IState>, private router: Router) { }

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
  }
  goToOrder(): void {
    this.router.navigateByUrl('/order');
  }

  deleteAll() {
    this.state.dispatch(removeFromBag({ bagId: this.products[0].bagId, productIds: this.products.map(p => p._id)}))
  }
}
