import { Injectable } from "../../../node_modules/@angular/core";
import { AppActions, UPDATE_LIST, AppActionUpdateSuccess, DELETE_ITEM, AppActionDeleteSuccess, UPDATE_SUMM } from "./action";
import { CommonService } from "../common.service";
import { Effect, Actions, ofType } from "../../../node_modules/@ngrx/effects";
import { switchMap, map } from "../../../node_modules/rxjs/operators";
import { Observable } from "../../../node_modules/rxjs";
import { Action } from "../../../node_modules/@ngrx/store";



@Injectable()
export class listEffect {
    constructor(
        private action: Actions,
        private service: CommonService
    ) {}

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

    @Effect()
    updateSummary(): Observable<Action> {
        console.log('effect gets ', this.action);
        var updSummary = this.action.pipe(
            //effect will intercept the AppActionUpd action that has owner info
            ofType<AppActions>(UPDATE_SUMM),
            //it passes the owner info to the getpurchase service method and get back records belongs to the owner
            switchMap(action => {console.log(action.payload); return this.service.getSummary(action.payload)}),
            //it will then use the data received to create a new action and pass it to reducer
            map(dataReceived => new AppActionUpdateSuccess(dataReceived))
        )
        console.log(updSummary);
        return updSummary;
    }

    @Effect()
    deleteItem(): Observable<Action> {
        console.log(this.action);
        var delAction = this.action.pipe(
            ofType<AppActions>(DELETE_ITEM),
            switchMap(action => this.service.deletePurchase(action.payload)),
            map(list => {console.log('in deleteitem ', list) ;return new AppActionDeleteSuccess(list)})
        )
        // var delAction = this.action.pipe(
        //     ofType<AppActions>(DELETE_ITEM),
        //     switchMap(action => this.service.deletePurchase(action.payload)),
        //     map(list => {console.log('in deleteitem ', list) ;return new AppActionDeleteSuccess(list)})
        // )
        return delAction;
    }
}