/**
 *  @description State definition 
 */
export interface AppState{
    dataList: Array<any>;
    summary: Array<any>;
    owner: string;
    needToUpdate: boolean;
}

export const initialState: AppState = {
    dataList: ['fetching data'],
    summary: [],
    owner: '',
    needToUpdate: true
};