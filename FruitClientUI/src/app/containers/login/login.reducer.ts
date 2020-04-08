
import {tassign} from 'tassign';
import { LOGOUT, SAVE_PROFILE, CHK_ADMIN } from './login.action';
export interface IItemFruitState {
    isLoggedIn: boolean;
    isAdmin: boolean;
    user_profile: any;
}

export const ITEM_INITIAL_STATE: IItemFruitState = {
    isLoggedIn: false,
    isAdmin: false,
    user_profile: {}
};

export function ItemFruitReducer(state: IItemFruitState= ITEM_INITIAL_STATE, action): IItemFruitState {
    switch (action.type) {
        case LOGOUT:
            return tassign( state, {isLoggedIn : false});

        case SAVE_PROFILE:
            return tassign( state, {user_profile: action.user_profile});

        case CHK_ADMIN:
            return tassign( state, {isAdmin: action.isAdmin});
    }
    return state;
}
