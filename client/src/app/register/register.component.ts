import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { getBag } from '../store/actions/bag.actions';
import { getOrder } from '../store/actions/order.actions';
import { registerError, startRegister } from '../store/actions/user.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  
  constructor(private fb: FormBuilder, private store: Store<IState>, private router: Router, private actions$: Actions) { }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.get('password').value;
  let confirmPass = group.get('confirmPassowrd').value;
  return pass === confirmPass ? null : { notSame: true }     
}
step=1;
cities=[
  'Tel Aviv',
  'Haifa',
  'Jerusalem',
  'Ramat Gan',
  'Herzelia',
  'Holon',
  'Eylat',
  'Zfat',
  'Bat Yam',
  'Kiryat Ono',
];
form = this.fb.group({
  email: this.fb.control('', [Validators.required, Validators.email]),
  password: this.fb.control('', [
    Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
  ]),
  confirmPassowrd: this.fb.control('', [Validators.required])
}, {validator: this.checkPasswords });

nextForm = this.fb.group({
  firstName: this.fb.control('', [Validators.required]),
  lastName: this.fb.control('', [Validators.required]),
  city: this.fb.control('', [Validators.required]),
  street: this.fb.control('', [Validators.required]),
});

ngOnInit(): void {
}

next() {
  this.step=2;
}
emailExistError: Error;
register() {
  const { email,password} = this.form.value;
  const { firstName,lastName, city,street } = this.nextForm.value;
  this.store.dispatch(startRegister({firstName,lastName,  email,password, city,street}));
  this.actions$.pipe(ofType(registerError)).subscribe(action => {
    this.step = 1;
    this.emailExistError = action.error;
  });
  this.store.select(state => state.user.user).subscribe(user => {
    if (user) {
      this.store.dispatch(getBag({ userId: user._id }));
      this.store.dispatch(getOrder({ userId: user._id }));
      this.store.select(state => state.bag.bag)
        .subscribe(bag => {
          if (user?.role === 'admin') {
            this.router.navigate(['/products']);
          }
          location.reload();
          this.router.navigate(['/']);
        });     
    } 
  });
}
}