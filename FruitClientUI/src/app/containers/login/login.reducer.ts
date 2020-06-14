
import {tassign} from 'tassign';
import { SAVE_PROFILE, CHK_ADMIN, LOGIN_LOADER, LOGIN } from './login.action';
import { LOGOUT } from 'src/app/components/items-fruit/item-fruit.action';
export interface LoginState {
    isLoggedIn: boolean;
    is_admin: boolean;
    user_profile: any;
    login_loader: boolean;
    username: string;
    user_id: number;
    isLogin: boolean;
}

export const LOGIN_INITIAL_STATE: LoginState = {
    isLoggedIn: false,
    is_admin: false,
    user_profile: {},
    login_loader: false,
    username: '',
    user_id: 0,
    isLogin: false
};

export function LoginSignupReducer(state: LoginState= LOGIN_INITIAL_STATE, action): LoginState {
    switch (action.type) {

        case SAVE_PROFILE:
            return tassign( state, {username: action.username, login_loader: false, isLogin: true,
                user_id: action.userId, is_admin: action.roleId === 1 ? true : false});

        case CHK_ADMIN:
            return tassign( state, {is_admin: action.is_admin});

        case LOGIN_LOADER:
            return tassign( state, {login_loader: true});

        case LOGIN:
            return tassign(state, {isLogin: true});

        case LOGOUT:
            return tassign(state, {isLogin: false});
    }
    return state;
}
