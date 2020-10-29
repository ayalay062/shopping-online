import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingBagComponent } from '../shopping-bag/shopping-bag.component';
import { IUser } from 'src/models/user.model';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { ping, startLogin, logout } from '../store/actions/user.actions';
import { getBag } from '../store/actions/bag.actions';
import { getOrder } from '../store/actions/order.actions';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user$: Observable<IUser>;
  constructor(private store: Store<IState>, private cookieService: CookieService,public dialog: MatDialog, private router: Router) {
    if (localStorage.getItem('token')) {
      this.store.dispatch(ping());
    }
    const userString = this.cookieService.get('user');
    if (userString && userString!== 'undefined') {
      const user: IUser = JSON.parse(userString);
      this.store.dispatch(startLogin({ email: user.email, password: user.password}));
      this.store.select(state => state.user.user)
        .subscribe(user => {
          if (user) {
            this.store.dispatch(getBag({ userId: user._id }));
            this.store.dispatch(getOrder({ userId: user._id }));
          }
        })
    }
  }
  ngOnInit(): void {
    this.user$ = this.store.select(state => state.user.user);
  }
  
  logout() {
    this.cookieService.delete('user');
    localStorage.removeItem('token');
    this.store.dispatch(logout());
    this.router.navigateByUrl("/login");
    // this.user$ = this.store.select(state => state.user.user);
  }


  openDialogBasket() {
    const dialogRef = this.dialog.open(ShoppingBagComponent, {
   
       data: {modal: true}
    });
    dialogRef.afterClosed().subscribe((result) => {
      
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
