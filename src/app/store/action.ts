import { Action } from "../../../node_modules/@ngrx/store";
import { Actions } from "../../../node_modules/@ngrx/effects";
import { importExpr } from "@angular/compiler/src/output/output_ast";

export const ADD_ITEM: string = 'ADD_ITEM';
export const DELETE_ITEM: string = 'DETELET_ITEM';
export const UPDATE_LIST: string = 'UPDATE_LIST';
export const UPDATE_SUCCESS: string = 'UPDATE_SUCCESS';
export const DELETE_SUCCESS: string = 'DELETE_SUCCESS';
export const ASSIGN_OWNER: string = 'ASSIGN_OWNER';
export const UPDATE_SUMM: string = 'UPDATE_SUMM';
export const LOG_OUT: string = 'LOG_OUT';

export class AppActionAdd implements Action{
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

export class AppActionUpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;
    constructor(public payload?: any){}
}

export class AppActionDeleteSuccess implements Action {
    readonly type = DELETE_SUCCESS;
    constructor(public payload?: any){}
}

export class AppActionAssignOwner implements Action {
    readonly type = ASSIGN_OWNER;
    constructor(public payload:any){}
}

export class AppActionUpdateSummary implements Action {
    readonly type = UPDATE_SUMM;
    constructor(public payload:any){}
}

export class AppActionLogout implements Action {
    readonly type = LOG_OUT;
    constructor(public payload?:any){}
}

export type AppActions = AppActionAdd | AppActionDel | 
                         AppActionUpd | AppActionUpdateSuccess | 
                         AppActionAssignOwner | AppActionUpdateSummary | AppActionLogout;