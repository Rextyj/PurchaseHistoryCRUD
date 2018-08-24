import { ActionReducer, Action } from '@ngrx/store';
import { initialState, AppState } from './state';
import {AppActions,UPDATE_SUCCESS, DELETE_SUCCESS, ASSIGN_OWNER, LOG_OUT} from './action';


export const AppReducer: ActionReducer<AppState> =
    (state = initialState, action: AppActions) => {
        console.log('Action came in ' + action.type);
        switch (action.type) {

            //note the UPDATE_SUCCESS case is the same as DELETE_SUCCESS,
            //we can merge those two cases
            case UPDATE_SUCCESS:
                state = {
                    dataList: action.payload,
                    owner: state.owner
                }
                return state;
            case DELETE_SUCCESS:
                state = {
                    dataList: action.payload,
                    owner: state.owner
                }
                return state;
            case ASSIGN_OWNER:
                state = {
                    dataList: state.dataList,
                    owner: action.payload
                }
                return state;
            case LOG_OUT:
                state = {
                    dataList: ['fetching data'],
                    owner: ''
                }
                return state;
            default:
                //return the current state unchanged
                return state;
        }
    }