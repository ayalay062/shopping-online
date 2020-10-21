import { createReducer, on } from '@ngrx/store';
import { completeLogin, logout } from '../actions/user.actions';
import { IUser } from '../../../models/user.model';

export interface IUserState {
    isLoggedIn: boolean;
    user: IUser | null;
    role: string;
    // order: IOrder|null;
    // bag: IBag|null;


}

const getInitialState = (): IUserState => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return {
        isLoggedIn: !!token,
        user: user !== 'undefined' && JSON.parse(user),
        role:'',
        // order:null,
        // bag:null,

    };
};

export const userReducer = createReducer(getInitialState(),
    on(completeLogin, (state, { user }) => {
        return { ...state, isLoggedIn: true, user };
    }),
    on(logout, () => getInitialState()),
);