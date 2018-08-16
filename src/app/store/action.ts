import { Action } from "../../../node_modules/@ngrx/store";

export const ADD_ITEM: string = 'ADD_ITEM';
export const DELETE_ITEM: string = 'DETELET_ITEM';

export class AppActionADD implements Action{
    readonly type = ADD_ITEM;
    constructor(public payload: any){}
}

export class AppActionDel implements Action{
    readonly type = DELETE_ITEM;

    constructor(public payload: any){}
}

export type AppActions = AppActionADD | AppActionDel;