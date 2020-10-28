import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createOrder, countDates } from '../store/actions/order.actions';
import { IState } from '../app.module';
import { Router } from '@angular/router';
import { ISelectedProducts } from 'src/models/selectedProducts.model';
import { IOrder } from 'src/models/order.model';
import { OrderService } from '../services/order.service';
import { closeBag } from '../store/actions/bag.actions';
import { debounceTime, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  validateDateAvailability(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.orderService.countDates(control.value)
      .pipe(debounceTime(500), map((count: { count: number; }) => {
        if (count.count > 3) {
          return {
            notAvailable: true
          };
        }
        return null;
      }));
}

  constructor(private fb: FormBuilder, private store: Store<IState>, private router: Router, private cookieService: CookieService, private orderService: OrderService) { }
  form: FormGroup;

  buildForm () {
    this.form = this.fb.group({
    
      city: this.fb.control('', [Validators.required]),
      street: this.fb.control('', [Validators.required]),
      deliveryDate: this.fb.control('', Validators.compose([Validators.required]), Validators.composeAsync([this.validateDateAvailability.bind(this)])),
      LastDigitsCreditCard: this.fb.control('', [Validators.required, Validators.pattern("^4[0-9]{12}(?:[0-9]{3})?$")]),
    });
  }
  
  fill(field) {
    const user = JSON.parse(this.cookieService.get('user'));
    this.form.controls[field].setValue(user[field]);
  }
  
  getTotal$() {
    return this.store.select(state => {
      if (state.bag.bag?.products) {//////////////////////////
        return state.bag.bag.products.reduce((acc, p) => acc + p.qty*p.productId.price,0);
      }
    });
  }
  
  customerId$: Observable<string>
  bagId$: Observable<string>
  createdOrder$: Observable<IOrder>;
  showSuccessModal=false;
  total=0;
  receipt:any;
  createOrder() {
    this.receipt=document.getElementById('bag').innerHTML;
    const order = this.form.value;
    let customerId;
    let bagId;
    this.customerId$.subscribe(id => {
      customerId = id
    });
    this.getTotal$().subscribe(result => this.total = result );
    this.bagId$.subscribe(id => bagId = id);
    this.store.dispatch(createOrder({ order: {
      ...order, customerId,
      bagId,
      totalPrice: this.total,
    }
  }));
  this.store.select(state => state.order.order)
  .subscribe(order => {
    this.showSuccessModal=true;
    this.store.dispatch(closeBag({ bagId }));
  });
}

closeModal() {
  this.router.navigate(['/']);
}

productsCart$: Observable<ISelectedProducts[]>
ngOnInit() {
  this.productsCart$ = this.store.select(state => state.bag.bag.products);
  this.customerId$ = this.store.select(state => state.user.user._id);
  this.bagId$ = this.store.select(state => state.bag.bag?._id);
  this.buildForm()
}
}
