import { ActionReducer, Action } from '@ngrx/store';
import { initialState, AppState } from './state';
import {AppActions,UPDATE_SUCCESS, DELETE_SUCCESS, ASSIGN_OWNER, LOG_OUT, UPDATE_SUMMARY_SUCCESS} from './action';

/**
 * @description Ngrx reducer
 */
export const AppReducer: ActionReducer<AppState> =
    (state = initialState, action: AppActions) => {
        console.log('Action came in ' + action.type);
        switch (action.type) {
            //when the action is type update_success, create a new state with datalist being action payload
            case UPDATE_SUCCESS:
                state = {
                    dataList: action.payload,
                    summary: state.summary,
                    owner: state.owner,
                    needToUpdate: false
                };
                return state;
            case DELETE_SUCCESS:
                state = {
                    dataList: action.payload,
                    summary: state.summary,
                    owner: state.owner,
                    needToUpdate: false
                };
                return state;
            //Case for action type assign_owner. Action payload will be the owner username
            case ASSIGN_OWNER:
                state = {
                    dataList: state.dataList,
                    summary: state.summary,
                    owner: action.payload,
                    needToUpdate: true
                };
                return state;
            //log_out action will cause the state being reset to the initial state
            case LOG_OUT:
                state = {
                    dataList: ['fetching data'],
                    summary: state.summary,
                    owner: 'none',
                    needToUpdate: true
                };
                return state;
            //update_summary_success action will assign the action payload to the summary property of the new state
            case UPDATE_SUMMARY_SUCCESS:
                state = {
                    dataList: state.dataList,
                    summary: action.payload,
                    owner: state.owner,
                    needToUpdate: false
                };
                return state;
            default:
                //return the current state unchanged
                return state;
        }
    }