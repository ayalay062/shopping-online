import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { OrderService } from '../services/order.service';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { IBag } from 'src/models/bag.model';
import { ICount } from 'src/models/count.model';
import { IOrder } from 'src/models/order.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.css']
})
export class HomeDetailsComponent implements OnInit {
  @Input() id: string;
  productsCount$: Observable<ICount>;
  ordersCount$: Observable<ICount>;
  bag$: Observable<IBag>;
  order$: Observable<IOrder>;
  btnText: string;
  constructor(private store: Store<IState>, private productSer: ProductService, private orderSer: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.ordersCount$ = this.orderSer.countOrders();
    this.productsCount$ = this.productSer.getProductsCount();
  }

  goToProductsPage() {
    this.router.navigateByUrl('/products');
  }
}
