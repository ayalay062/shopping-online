import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IState } from './app.module';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PrivateRoute implements CanActivate {

    isLoggedIn$: Observable<boolean>;
    constructor(private router: Router, private store: Store<IState>) {
        this.isLoggedIn$ = this.store.select(state => state.user.isLoggedIn);
    }

    canActivate(): Observable<boolean> {
        return this.isLoggedIn$.pipe(map(isLoggedIn => {
            if (isLoggedIn) {
                return true;
            }
            // not logged in so redirect to login page with the return url
            this.router.navigateByUrl('/login');
            return false;
        }));
    }
}