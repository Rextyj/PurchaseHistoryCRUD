import {GetUser, SaveUser} from './controller/userController';
import {getRecords, saveRecord, getAverage} from './controller/recordController';

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
        path: "/records/api/getPurchase/getAverage",
        method: "post",
        action: getAverage
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