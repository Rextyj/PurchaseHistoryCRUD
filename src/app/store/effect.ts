import { Injectable } from "../../../node_modules/@angular/core";
import { UPDATE_LIST, DELETE_ITEM, UPDATE_SUMM, ADD_ITEM, AppActions, AppActionUpd, AppActionUpdateSuccess, AppActionUpdateSummarySuccess, AppActionDeleteSuccess } from "./action";
import { CommonService } from "../service/common.service";
import { Effect, Actions, ofType } from "../../../node_modules/@ngrx/effects";
import { switchMap, map, withLatestFrom } from "../../../node_modules/rxjs/operators";
import { Observable } from "../../../node_modules/rxjs";
import { Action, Store } from "../../../node_modules/@ngrx/store";
import { AppState } from "./state";

/**
 * @description Ngrx effects used for handling side effects
 */
@Injectable()
export class listEffect {
    constructor(
        private action: Actions,
        private service: CommonService,
        private store: Store<AppState>
    ) {}

    //Additem effect
    @Effect()
    addItem(): Observable<Action> {
        var username;
        var addAction = this.action.pipe(
            ofType<AppActions>(ADD_ITEM),
            //the payload passed in is formdata that has Owner property
            //save the purchase record came with action by making an API call
            switchMap(action => {username = action.payload.Owner; return this.service.savePurchase(action.payload)}),
            //use the returned response from backend and dispatch a new update action
            map(dataReceived => {alert(dataReceived.data); return new AppActionUpd({owner: username})})
        )
        return addAction;
    }

    //Effect to intercept update list action
    @Effect()
    updateList(): Observable<Action> {
        console.log('effect gets ', this.action);
        var updAction = this.action.pipe(
            //effect will intercept the AppActionUpd action that has owner info
            ofType<AppActions>(UPDATE_LIST),
            //it passes the owner info to the getpurchase service method and get back records belongs to the owner
            switchMap(action => {console.log(action.payload); return this.service.GetPurchase(action.payload)}),
            //it will then use the data received to create a new action and pass it to reducer
            map(dataReceived => new AppActionUpdateSuccess(dataReceived))
        )
        console.log(updAction);
        return updAction;
    }

    //Effect to intercept update summary action
    @Effect()
    updateSummary(): Observable<Action> {
        console.log('effect gets ', this.action);
        var updSummary = this.action.pipe(
            //effect will intercept the AppActionUpd action that has owner info
            ofType<AppActions>(UPDATE_SUMM),
            //it passes the owner info to the getpurchase service method and get back records belongs to the owner
            switchMap(action => {console.log(action.payload); return this.service.getSummary(action.payload)}),
            //it will then use the data received to create a new action and pass it to reducer
            map(dataReceived => {console.log(dataReceived); return new AppActionUpdateSummarySuccess(dataReceived)})
        )
        console.log(updSummary);
        return updSummary;
    }

    //Effect to intercept delete item action
    @Effect()
    deleteItem(): Observable<Action> {
        console.log(this.action);
        var username;
        var delAction = this.action.pipe(
            ofType<AppActions>(DELETE_ITEM),
            switchMap(action => {username = action.payload.owner ;return this.service.deletePurchase(action.payload)}),
            switchMap(respose => this.service.GetPurchase({owner: username})),
            map(list => {console.log('in deleteitem ', list) ;return new AppActionDeleteSuccess(list)})
        )
        return delAction;
    }
}