export interface AppState{
    dataList: Array<any>;
    owner: string;
    needToUpdate: boolean;
}

export const initialState: AppState = {
    dataList: ['fetching data'],
    owner: '',
    needToUpdate: true
};