import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IState } from './app.module';
import { pipe, Observable } from 'rxjs';
import { ping, startLogin } from './store/actions/user.actions';
import { IUser } from 'src/models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user$: Observable<IUser>;
  constructor(private store: Store<IState>, private cookieService: CookieService) {
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
}