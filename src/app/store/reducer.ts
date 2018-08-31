import { ActionReducer, Action } from '@ngrx/store';
import { initialState, AppState } from './state';
import {AppActions,UPDATE_SUCCESS, DELETE_SUCCESS, ASSIGN_OWNER, LOG_OUT, UPDATE_SUMMARY_SUCCESS} from './action';


export const AppReducer: ActionReducer<AppState> =
    (state = initialState, action: AppActions) => {
        console.log('Action came in ' + action.type);
        switch (action.type) {
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
            case ASSIGN_OWNER:
                state = {
                    dataList: state.dataList,
                    summary: state.summary,
                    owner: action.payload,
                    needToUpdate: true
                };
                return state;
            case LOG_OUT:
                state = {
                    dataList: ['fetching data'],
                    summary: state.summary,
                    owner: '',
                    needToUpdate: true
                };
                return state;
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