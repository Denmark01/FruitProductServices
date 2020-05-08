
import { tassign } from 'tassign';
import {
    INCREMENT, GET_FRUIT_LIST, START_LOADER, LOGOUT, NOTIFICATION, SAVE_CART,
    SELECT_ITEM, NOTIFICATION_DISAPPEAR, DECREMENT, DELETE_CART, UPDATE_CART_ITEM, UPDATE_QTY,
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
    fruit_vege: 'FRUITS',
    cart_qty: 0
};

export function ItemFruitReducer(state: IItemFruitState = ITEM_INITIAL_STATE, action): IItemFruitState {


    switch (action.type) {
        // case INCREMENT:
            // return {counter : state.counter + 1};
            // return Object.assign({}, state, {counter: state.counter + 1, bool: true });
            // return tassign(state, { counter: state.counter + 1 });

        case GET_FRUIT_LIST:
            if (action.payload) {
                return tassign(state, { item_list: action.payload, item_loader: false, isLoggedIn: true });
            }
            return tassign(state);

        case START_LOADER:
            return tassign(state, { item_loader: true });

        case LOGOUT:
            return tassign(state, { isLoggedIn: false, cart_item: [], item_list: [] });

        case NOTIFICATION:
            return tassign(state, { growlMsg: action.msg, growlType: action.msgType });

        case SAVE_CART:
            if (action.cart_item) {
                return tassign(state, { cart_item: action.cart_item, cart_qty: action.cart_item.length});
            }
        return tassign(state);

        case SELECT_ITEM:
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
            return tassign(state, { cart_item: temp_cart, item_list: temp_item });

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
            return tassign(state, { cart_item: temp_cart, item_list: temp_item });

        case DELETE_CART:
            temp_cart = state.cart_item;
            const index = action.index;
            temp_cart[index].qty = 0;
            temp_cart.splice(index, 1);
            return tassign(state, { cart_item: temp_cart, cart_qty: action.cart_item.length});

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
            return tassign(state, { cart_item: temp_cart , cart_qty: temp_cart.length});


        case UPDATE_QTY:
           /*  temp_item = state.item_list;
            temp_cart = state.cart_item;
            for (let i = 0; i < temp_cart.length; i++) {
                for (let j = 0; j < temp_cart.length; j++) {
                    if (temp_item[j].item_id === this.temp_cart[i].item_id) {
                        temp_item.forEach(data => {
                            if (temp_cart[i].item_id === data.item_id) {
                                data.qty = temp_cart[i].qty;
                            }
                        });
                        break;
                    }
                } */
                // const val = temp_item.filter(e => e.item_id === this.temp_cart[i].item_id);
               /*  if (val > 0) {
                    temp_item.forEach(data => {
                        if (temp_cart[i].item_id === data.item_id) {
                            data.qty = temp_cart[i].qty;
                        }
                    });
                } */
            // }
            if (action.for === 'ITEM_UPDATE') {
                return tassign(state, { item_list: action.item_list});
            } else if (action.for === 'CART_UPDATE') {
                return tassign(state, { cart_item: action.cart_item });
            }

    }
    return state;
}
