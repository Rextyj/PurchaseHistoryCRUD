import {GetUser, SaveUser} from './controller/userController';
import {getRecords, saveRecord, getAverage, deleteRecord, getBetweenDate} from './controller/recordController';

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/users/api/getUser",
        method: "post",
        action: GetUser
    },

    {
        path: "/users/api/saveUser",
        method: "post",
        action: SaveUser
    },

    {
        path: "/records/api/getPurchase",
        method: "post",
        action: getRecords
    },

    {
        path: "/records/api/SavePurchase",
        method: "post",
        action: saveRecord
    },

    {
        path: "/records/api/deletePurchase",
        method: "delete",
        action: deleteRecord
    },

    {
        path: "/records/api/getPurchase/getAverage",
        method: "post",
        action: getAverage
    },

    {
        path: "/records/api/getPurchase/getBetweenDate",
        method: "post",
        action: getBetweenDate
    }
    // {
    //     path: "/posts/:id",
    //     method: "get",
    //     action: postGetByIdAction
    // },
    // {
    //     path: "/posts",
    //     method: "post",
    //     action: postSaveAction
    // }
];