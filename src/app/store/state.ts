export interface AppState{
    dataList: Array<any>;
    owner: string;
}

export const initialState: AppState = {
    dataList: ['fetching data'],
    owner: ''
};