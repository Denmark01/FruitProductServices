
import {tassign} from 'tassign';
import { SAVE_PROFILE, CHK_ADMIN, LOGIN_LOADER } from './login.action';
export interface LoginState {
    isLoggedIn: boolean;
    is_admin: boolean;
    user_profile: any;
    login_loader: boolean;
}

export const LOGIN_INITIAL_STATE: LoginState = {
    isLoggedIn: false,
    is_admin: false,
    user_profile: {},
    login_loader: false
};

export function LoginSignupReducer(state: LoginState= LOGIN_INITIAL_STATE, action): LoginState {
    switch (action.type) {

        case SAVE_PROFILE:
            return tassign( state, {user_profile: action.user_profile, login_loader: false});

        case CHK_ADMIN:
            return tassign( state, {is_admin: action.is_admin});

        case LOGIN_LOADER:
            return tassign( state, {login_loader: true});
    }
    return state;
}
