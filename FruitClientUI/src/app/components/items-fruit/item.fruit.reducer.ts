
import {tassign} from 'tassign';
import { INCREMENT, GET_FRUIT_LIST, START_LOADER, LOGOUT, SAVE_PROFILE, CHK_ADMIN } from './item-fruit.action';
export interface IItemFruitState {
    counter: number;
    item_list: any;
    isLoggedIn: boolean;
    item_loader: boolean;
    isAdmin: boolean;
    user_profile: any;
}

export const ITEM_INITIAL_STATE: IItemFruitState = {
    counter: 0,
    item_list: [],
    item_loader: false,
    isLoggedIn: false,
    isAdmin: false,
    user_profile: {}
};

export function ItemFruitReducer(state: IItemFruitState= ITEM_INITIAL_STATE, action): IItemFruitState {
    switch (action.type) {
        case INCREMENT:
        // return {counter : state.counter + 1};
        // return Object.assign({}, state, {counter: state.counter + 1, bool: true });
        return tassign( state, {counter: state.counter + 1 });

        case GET_FRUIT_LIST:
            if (action.payload) {
                return tassign( state, {item_list : action.payload.product_list, item_loader: false, isLoggedIn: true});
            }
            return tassign( state );

        case START_LOADER:
            return tassign( state, {item_loader : true});

        case LOGOUT:
            return tassign( state, {isLoggedIn : false});

        case SAVE_PROFILE:
            return tassign( state, {user_profile: action.user_profile});

        case CHK_ADMIN:
            return tassign( state, {isAdmin: action.isAdmin});
    }
    return state;
}
