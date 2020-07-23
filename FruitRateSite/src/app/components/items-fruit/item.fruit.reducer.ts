
import { tassign } from 'tassign';
import {
    INCREMENT, GET_FRUIT_LIST, START_LOADER, LOGOUT, NOTIFICATION, SAVE_CART,
    SELECT_ITEM, NOTIFICATION_DISAPPEAR, DECREMENT, DELETE_CART, UPDATE_CART_ITEM, EMPTY_ALL, CART_LIST, DETECT_CART_CHANGE,
} from './item-fruit.action';
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
    cart_qty: number;
    // in_cart_comp: boolean;
    // chn_in_cart: boolean;
    change_in_item: boolean;
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
    fruit_vege:  '',
    cart_qty: 0,
    // in_cart_comp: false,
    // chn_in_cart: false
    change_in_item: false
};

export function ItemFruitReducer(state: IItemFruitState = ITEM_INITIAL_STATE, action): IItemFruitState {


    switch (action.type) {
        // case INCREMENT:
            // return {counter : state.counter + 1};
            // return Object.assign({}, state, {counter: state.counter + 1, bool: true });
            // return tassign(state, { counter: state.counter + 1 });

        case GET_FRUIT_LIST:
            if (action.payload) {
                return tassign(state, { item_list: action.payload, item_loader: false, isLoggedIn: true});
            }
            return tassign(state);

        case START_LOADER:
            return tassign(state, { item_loader: true });

        case LOGOUT:
            return tassign(state, { isLoggedIn: false, cart_item: [], item_list: [], fruit_vege: ''});

        case NOTIFICATION:
            return tassign(state, { growlMsg: action.msg, growlType: action.msgType });

        case SAVE_CART:
                const product_list = state.item_list;
                const added_cart = state.cart_item;
                    for (let i = 0 ; i < product_list.length; i++) {
                    const val = product_list.filter(e => e.item_id === added_cart[i].item_id);
                    if (val.length > 0) {
                        product_list.forEach(data => {
                            if (data.item_id === added_cart[i].item_id) {
                                data.qty = added_cart[i].qty;
                            }
                        });
                    }
                    }
                return tassign(state, { item_list: product_list, cart_item: added_cart, cart_qty: added_cart.length,
                    growlMsg: null, growlType: null,  change_in_item: action.change_in_item});

        case CART_LIST:
            return tassign (state, {cart_item: action.cart_item, cart_qty: action.cart_item.length});

        case EMPTY_ALL:
            return tassign(state, {cart_item: [], item_list: []});

        case SELECT_ITEM:
            if (action.fruit_vege === 'ALL') {
                return tassign(state, { fruit_vege: '' });
            }
            return tassign(state, { fruit_vege: action.fruit_vege });


        case NOTIFICATION_DISAPPEAR:
                return tassign(state, { growlMsg: null, growlType: null });

        case INCREMENT:
            let temp_cart = state.cart_item;
            let temp_item = state.item_list;
            if (action.action === 'MAIN') {
                for (let i = 0; i < temp_item.length; i++) {
                    if (temp_item[i].item_id === action.item_id) {
                      if (temp_item[i].qty + 1 <= temp_item[i].max_qty) {
                        temp_item[i].qty += 1;
                        break;
                      }
                    }
                  }
            } else {

                for (let i = 0; i < temp_cart.length; i++) {
                    if (temp_cart[i].item_id === action.item_id) {
                        if (temp_cart[i].qty + 1 <= temp_cart[i].max_qty) {
                            temp_cart[i].qty += 1;
                            break;
                        }
                    }
                }
            }
            return tassign(state, { cart_item: temp_cart, item_list: temp_item, 
                change_in_item: action.change_in_item });

        case DECREMENT:
            temp_cart = state.cart_item;
            temp_item = state.item_list;
            if (action.action === 'MAIN') {
                for (let i = 0; i < temp_item.length; i++) {
                    if (temp_item[i].item_id === action.item_id) {
                        if (temp_item[i].qty - 1 < 0) {
                            temp_item[i].qty = 0;
                        } else {
                            temp_item[i].qty -= 1;
                        }
                        break;
                    }
                }
            } else {
                for (let i = 0; i < temp_cart.length; i++) {
                    if (temp_cart[i].item_id === action.item_id) {
                        if (temp_cart[i].qty - 1 < 1) {
                            temp_cart[i].qty = 1;
                            break;
                        } else {
                            temp_cart[i].qty -= 1;
                        }
                    }
                }
            }
            return tassign(state, { cart_item: temp_cart, item_list: temp_item,
                change_in_item: action.change_in_item});

        case DELETE_CART:
            temp_cart = state.cart_item;
            const index = action.index;
            temp_cart[index].qty = 0;
            temp_cart.splice(index, 1);
            return tassign(state, { cart_item: temp_cart, change_in_item: action.change_in_item});

        case UPDATE_CART_ITEM:
            temp_cart = state.cart_item;
            if (action.action === 'UPDATE') {
                const item = action.item;
                temp_cart.forEach(data => {
                    if (data.item_id === item.item_id) {
                        data.qty = item.qty;
                        // data.max_qty = item.max_qty;
                    }
                });
            } else if (action.action === 'ADD') {
                const item = action.item;
                temp_cart.push({ ...item });
            }
            return tassign(state, { cart_item: temp_cart , cart_qty: temp_cart.length,  change_in_item: action.change_in_item});

        case DETECT_CART_CHANGE:
            return tassign(state, {change_in_item: action.change_in_item});

    }
    return state;
}
