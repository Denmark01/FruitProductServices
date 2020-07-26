
import {tassign} from 'tassign';
import { SAVE_PROFILE, CHK_ADMIN, LOGIN_LOADER, LOGIN, LOADER_OFF } from './login.action';
import { LOGOUT } from 'src/app/components/items-fruit/item-fruit.action';
export interface LoginState {
    isLoggedIn: boolean;
    is_admin: boolean;
    user_profile: any;
    login_loader: boolean;
    username: string;
    user_id: number;
    isLogin: boolean;
    roleId: number;
    shopName: string;
}

export const LOGIN_INITIAL_STATE: LoginState = {
    isLoggedIn: false,
    is_admin: false,
    user_profile: {},
    login_loader: false,
    username: '',
    user_id: 0,
    isLogin: false,
    roleId: 0,
    shopName: ''
};

export function LoginSignupReducer(state: LoginState= LOGIN_INITIAL_STATE, action): LoginState {
    switch (action.type) {

        case SAVE_PROFILE:
            return tassign( state, {username: action.username, login_loader: false, isLogin: true,
                user_id: action.userId, is_admin: action.roleId === 1 ? true : false, roleId: action.roleId, shopName: action.shopName});

        case CHK_ADMIN:
            return tassign( state, {is_admin: action.is_admin});

        case LOGIN_LOADER:
            return tassign( state, {login_loader: true});
        
        case LOADER_OFF:
        return tassign( state, {login_loader: false});

        case LOGIN:
            return tassign(state, {isLogin: true, username: action.username, user_id: action.user_id, login_loader: false});

        case LOGOUT:
            return tassign(state, {isLogin: false, is_admin: false, username: null, user_id: 0, roleId: 0,
                shopName: ''});
    }
    return state;
}
