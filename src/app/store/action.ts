import { Action } from "../../../node_modules/@ngrx/store";
import { Actions } from "../../../node_modules/@ngrx/effects";

export const ADD_ITEM: string = 'ADD_ITEM';
export const DELETE_ITEM: string = 'DETELET_ITEM';
export const UPDATE_LIST: string = 'UPDATE_LIST';
export const UPDATE_SUCCESS: string = 'UPDATE_SUCCESS';


export class AppActionADD implements Action{
    readonly type = ADD_ITEM;
    constructor(public payload?: any){}
}

export class AppActionDel implements Action{
    readonly type = DELETE_ITEM;

    constructor(public payload?: any){}
}

export class AppActionUpd implements Action{
    readonly type = UPDATE_LIST;
    constructor(public payload?: any){}
}

export class AppActionSuccess implements Action {
    readonly type = UPDATE_SUCCESS;
    constructor(public payload?: any){}
}

export type AppActions = AppActionADD | AppActionDel | AppActionUpd;