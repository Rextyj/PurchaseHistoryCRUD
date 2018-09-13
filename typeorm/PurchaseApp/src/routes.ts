import { GetUser, SaveUser } from './controller/userController';
import { getRecords, saveRecord, getAverage, deleteRecord, getBetweenDate, getMonthlyData, getData, getCompanyData, getShareData } from './controller/recordController';

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
    },

    {
        path: "/records/api/getPurchase/getMonthlyData",
        method: "post",
        action: getMonthlyData
    },

    {
        path: "/records/api/getPurchase/getData",
        method: "post",
        action: getData
    },

    {
        path: "/records/api/getPurchase/getCompanyData",
        method: "post",
        action: getCompanyData
    },

    {
        path: "/records/api/getPurchase/getShareData",
        method: "post",
        action: getShareData
    }
];