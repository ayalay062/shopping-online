import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../app/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router){ }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.authService.isAuth()) {
            return true;
         } else {
            this.router.navigate(["/login"]);
            return false;
         }
}

}