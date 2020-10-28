import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/models/user.model';

export const startRegister = createAction('REGISTER_PENDING', props<{ firstName:string; lastName:string;email: string; password: string;city:string;street:string }>());

export const startLogin = createAction('LOGIN_PENDING', props<{ email: string; password: string; }>());
export const completeLogin = createAction('LOGIN_SUCCESS', props<{ user: IUser }>());
export const loginError = createAction('LOGIN_ERROR',props<{ error: string }>());

 export const ping = createAction('PING');

export const logout = createAction('LOGOUT');
