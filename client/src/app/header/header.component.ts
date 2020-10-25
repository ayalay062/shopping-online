import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingBagComponent } from '../shopping-bag/shopping-bag.component';
import { IUser } from 'src/models/user.model';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { ping, startLogin } from '../store/actions/user.actions';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { OrderPageComponent } from '../pages/order-page/order-page.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user$: Observable<IUser>;
  constructor(private store: Store<IState>, private cookieService: CookieService,public dialog: MatDialog) {
    if (localStorage.getItem('token')) {
      this.store.dispatch(ping());
    }
    const userString = this.cookieService.get('user');
    if (userString && userString!== 'undefined') {
      console.log("user", userString);
      const user: IUser = JSON.parse(userString);
      this.store.dispatch(startLogin({ email: user.email, password: user.password}));
    }
  }
  ngOnInit(): void {
    this.user$ = this.store.select(state => state.user.user);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(OrderPageComponent, {
      width: '250px',
      // data: {name: this.name, animal: this.animal}
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  openDialogBasket() {
    const dialogRef = this.dialog.open(ShoppingBagComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
