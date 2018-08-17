import { Injectable } from "../../../node_modules/@angular/core";
import { AppActions, UPDATE_LIST, AppActionUpdateSuccess, DELETE_ITEM, AppActionDeleteSuccess } from "./action";
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
        console.log(this.action);
        var updAction = this.action.pipe(
            ofType<AppActions>(UPDATE_LIST),
            switchMap(action => this.service.GetPurchase()),
            map(list => new AppActionUpdateSuccess(list))
        )
        console.log(updAction);
        return updAction;
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