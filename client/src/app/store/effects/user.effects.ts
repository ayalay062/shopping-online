import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { completeLogin, startLogin, startRegister, loginError } from '../actions/user.actions';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private userService: UserService, private cookieService: CookieService) { }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(startLogin),
            mergeMap(action =>
                this.userService.login(action.email, action.password)
                    .pipe(
                        map(({ user, token }) => {
                            localStorage.setItem('token', token);
                            this.cookieService.set('user', JSON.stringify({ ...user, password: action.password }));
                            return completeLogin({ user });
                        }),
                        catchError((error: Error) => {
                            return of(loginError({ error: 'an error occured' }));
       
                        })
                    )
            )
        )
    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(startRegister),
            mergeMap(action =>
                this.userService.register(action.firstName, action.lastName, action.email, action.password, action.city, action.street)
                    .pipe(
                        map(({ token, user }) => {
                            localStorage.setItem('token', token);
                            this.cookieService.set('user', JSON.stringify({ ...user, password: action.password }));
                            return completeLogin({ user});
                        }),
                        catchError((error: Error) => {
                            return of({ type: 'error' });
                        })
                    )
            )
        )
    );

}