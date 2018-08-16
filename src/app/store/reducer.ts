import { ActionReducer, Action } from '@ngrx/store';
import { initialState, AppState } from './state';
import { ADD_ITEM, DELETE_ITEM, AppActions } from './action';

export const AppReducer: ActionReducer<AppState> =
    (state = initialState, action: AppActions) => {
        console.log('Action came in ' + action.type);
        switch (action.type) {
            case ADD_ITEM:
                state = {
                    dataList: action.payload
                }
                return state;
            case DELETE_ITEM:
                state = {
                    dataList: action.payload
                }
                return state;
            default:
                //return the current state unchanged
                return state;
        }
    }