import { ActionReducer, Action } from '@ngrx/store';
import { initialState, AppState } from './state';
import { ADD_ITEM, DELETE_ITEM, AppActions, UPDATE_LIST, UPDATE_SUCCESS, DELETE_SUCCESS } from './action';


export const AppReducer: ActionReducer<AppState> =
    (state = initialState, action: AppActions) => {
        console.log('Action came in ' + action.type);
        switch (action.type) {
            // case ADD_ITEM:
            //     state = {
            //         dataList: action.payload
            //     }
            //     return state;
            // case DELETE_ITEM:
            //     state = {
            //         dataList: action.payload
            //     }
            //     return state;


            //note the UPDATE_SUCCESS case is the same as DELETE_SUCCESS,
            //we can merge those two cases
            case UPDATE_SUCCESS:
                state = {
                    dataList: action.payload
                }
                return state;
            case DELETE_SUCCESS:
                state = {
                    dataList: action.payload
                }
                return state;
            default:
                //return the current state unchanged
                return state;
        }
    }