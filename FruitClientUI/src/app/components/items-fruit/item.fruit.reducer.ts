
import {tassign} from 'tassign';
import { INCREMENT, GET_FRUIT_LIST, START_LOADER, LOGOUT, NOTIFICATION, SAVE_CART, SELECT_ITEM} from './item-fruit.action';
export interface IItemFruitState {
    counter: number;
    item_list: any;
    isLoggedIn: boolean;
    item_loader: boolean;
    isAdmin: boolean;
    user_profile: any;
    growlMsg: string;
    growlType: string;
    cart_item: any;
    fruit_vege: string;
}

export const ITEM_INITIAL_STATE: IItemFruitState = {
    counter: 0,
    item_list: [],
    item_loader: false,
    isLoggedIn: false,
    isAdmin: false,
    user_profile: {},
    growlMsg: '',
    growlType: '',
    cart_item: [],
    fruit_vege: 'Fruit'
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

        case NOTIFICATION:
            return tassign( state, {growlMsg: action.msg, growlType: action.msgType});

        case SAVE_CART:
            return tassign( state, {cart_item: action.cart_item});

        case SELECT_ITEM:
            return tassign( state, {fruit_vege: action.fruit_vege});
    }
    return state;
}
