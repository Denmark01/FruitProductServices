import {combineReducers} from 'redux';
import { IItemFruitState, ITEM_INITIAL_STATE, ItemFruitReducer } from './components/items-fruit/item.fruit.reducer';
import { LoginState, LOGIN_INITIAL_STATE, LoginSignupReducer } from './containers/login/login.reducer';

export interface IAppState {
    itemFruit: IItemFruitState;
    login: LoginState;
}

export const InitialState: IAppState = {
    itemFruit: ITEM_INITIAL_STATE,
    login: LOGIN_INITIAL_STATE
};

export const rootReducer = combineReducers({
    itemFruit: ItemFruitReducer,
    login: LoginSignupReducer
})
