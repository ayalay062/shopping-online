import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { startLogin } from 'src/app/store/actions/user.actions';
import { IState } from '../app.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private store: Store<IState>, private router: Router) {   }

  form = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required, Validators.minLength(3)]),
  });

  ngOnInit() {

  }


  login() {
    const { email, password } = this.form.value;
    this.store.dispatch(startLogin({email, password}));
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}