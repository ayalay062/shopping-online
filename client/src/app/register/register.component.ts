import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { startRegister } from '../store/actions/user.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  
  constructor(private fb: FormBuilder, private store: Store<IState>, private router: Router) { }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.get('password').value;
  let confirmPass = group.get('confirmPassowrd').value;
  return pass === confirmPass ? null : { notSame: true }     
}
step=1;
form = this.fb.group({
  email: this.fb.control('', [Validators.required, Validators.email]),
  password: this.fb.control('', [Validators.required, Validators.minLength(3)]),
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
register() {
  const { email,password} = this.form.value;
  const { firstName,lastName, city,street } = this.nextForm.value;
  this.store.dispatch(startRegister({firstName,lastName,  email,password, city,street}));
  this.router.navigate(['/']);
}
}
