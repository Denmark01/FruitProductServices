import {combineReducers} from 'redux';
import { IItemFruitState, ITEM_INITIAL_STATE, ItemFruitReducer } from './components/items-fruit/item.fruit.reducer';

export interface IAppState {
    itemFruit: IItemFruitState;
}

export const InitialState: IAppState = {
    itemFruit: ITEM_INITIAL_STATE,
};

export const rootReducer = combineReducers({
    itemFruit: ItemFruitReducer
})
