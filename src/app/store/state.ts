/**
 *  @description State definition 
 */
export interface AppState{
    dataList: Array<any>;
    summary: Array<any>;
    owner: string;
    needToUpdate: boolean;
    needToUpdateSummary: boolean;
}

export const initialState: AppState = {
    dataList: ['fetching data'],
    summary: [],
    owner: 'none',
    needToUpdate: true,
    needToUpdateSummary: true
};