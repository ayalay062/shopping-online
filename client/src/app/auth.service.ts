import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isAuth(){
        return !!localStorage.getItem('token');
    }
}