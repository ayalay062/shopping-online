import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { startLogin } from '../store/actions/user.actions';
import { getBag } from '../store/actions/bag.actions';
import { IState } from '../app.module';
import { Router } from '@angular/router';
import { getOrder } from '../store/actions/order.actions';
import { Observable } from 'rxjs';
import { IBag } from 'src/models/bag.model';
import { IOrder } from 'src/models/order.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private store: Store<IState>, private router: Router) { }

  form = this.fb.group({
    email: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required, Validators.minLength(3)]),

  });
  @Output() register= new EventEmitter();
  ngOnInit(): void {
  }

  login() {
    const { email, password } = this.form.value;
    this.store.dispatch(startLogin({ email, password }));
    const user$ = this.store.select(state => state.user.user);
    user$.subscribe(user => {
      if (user.role === 'admin') {
        this.router.navigate(['/products']);
      }
      this.store.dispatch(getBag({ userId: user._id }));
    this.store.dispatch(getOrder({ userId: user._id }));
    });
  }

  goToRegister() {
   this.register.emit();
  }
}