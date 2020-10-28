import { createReducer, on } from '@ngrx/store';
import { completeLogin, loginError, logout } from '../actions/user.actions';
import { IUser } from '../../../models/user.model';

export interface IUserState {
    isLoggedIn: boolean;
    user: IUser | null;
    role: string;
    error: string;


}

const getInitialState = (): IUserState => {
    const token = localStorage.getItem('token');
    return {
        isLoggedIn: !!token,
        user: undefined,
        role:'',
        error: undefined,

    };
};

export const userReducer = createReducer(getInitialState(),
    on(completeLogin, (state, { user }) => {
        return { ...state, isLoggedIn: true, user, error: null };
    }),
    on(logout, () => getInitialState()),
    on(loginError, (state, error) => {
        return { ...state, error: 'an error occured' };
    })
);