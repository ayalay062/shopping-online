import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { startLogin, logout } from '../store/actions/user.actions';
import { getBag } from '../store/actions/bag.actions';
import { IState } from '../app.module';
import { Router } from '@angular/router';
import { getOrder } from '../store/actions/order.actions';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from 'src/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private store: Store<IState>, private router: Router, private cookieService: CookieService) { }

  form = this.fb.group({
    email: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required, Validators.minLength(3)]),

  });
  @Output() register= new EventEmitter();
  user: IUser;
  ngOnInit(): void {
    const userString = this.cookieService.get('user');
    if (userString && userString !== 'undefined') {
      this.user = JSON.parse(userString);
    }
  }

  logout() {
    this.cookieService.delete('user')
    localStorage.clear();
    this.store.dispatch(logout());
    this.store.select(state => state.user.user)
      .subscribe(user => {
        this.user = user;
      });
  }
  message: string;
  login() {
    const { email, password } = this.form.value;
    this.store.dispatch(startLogin({ email, password }));
    const user$ = this.store.select(state => state.user.user);
    user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.message="you logged in successfully";
        this.store.dispatch(getBag({ userId: user._id }));
        this.store.dispatch(getOrder({ userId: user._id }));
        if (user.role === 'admin') {
          this.router.navigate(['/products']);
        } else {
          this.router.navigate(['/']);
        }
      }
    });
    this.store.select(state => state.user.error)
      .subscribe(error => {
        this.message = error
      });
  }

 }