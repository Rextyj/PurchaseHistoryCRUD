import { Injectable } from "../../../node_modules/@angular/core";
import { AppActions, UPDATE_LIST, AppActionUpd, AppActionSuccess } from "./action";
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
            map(list => new AppActionSuccess(list))
        )
        console.log(updAction);
        return updAction;
    }

}