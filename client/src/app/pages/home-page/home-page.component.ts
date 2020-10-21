import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IState } from 'src/app/app.module';
import { IUser } from 'src/models/user.model';
import { getBag } from 'src/app/store/actions/bag.actions';
import { getOrder } from 'src/app/store/actions/order.actions';
import { IBag } from 'src/models/bag.model';
import { IOrder } from 'src/models/order.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  bag$: Observable<IBag>;
  order$: Observable<IOrder>;

  constructor(private store: Store<IState>) { }
  user$: Observable<IUser>;
  isLogIn=true
  ngOnInit(): void {
    this.user$ = this.store.select(state => state.user.user);
    this.store.select(state => state.user.user._id)
    .subscribe(id => {
      this.store.dispatch(getBag({ userId: id }));
      this.store.dispatch(getOrder({ userId: id }));
      this.bag$ = this.store.select(state => state.bag.bag);
      this.order$ = this.store.select(state => state.order.order);
    })
  }
toggleType(){
  this.isLogIn=!this.isLogIn;
}
}
