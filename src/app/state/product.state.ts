export enum ProductActionsTypes{
    GET_ALL_PRODUCTS  = "[Product] Get All products",
    GET_SAVE_PRODUCT = "[Product] New product",
    GET_SELECTED_PRODUCTS = "[Product] Get Selected products",
    GET_AVAILABLE_PRODUCTS = "[Product] Get Available products",
    SEARCH_PRODUCTS = "[Product] Search products",
    SELECT_PRODUCT = "[Product] Select product",
    DELETE_PRODUCT = "[Product] Delete product",
    EDIT_PRODUCT = "[Product] Edit product"
}

export interface ActionEvent {
    type : ProductActionsTypes,
    payload? : any
}

export enum DataStateEnum{
    LOADING,
    LOADED,
    ERROR,
}

export interface AppDataState<T>{
    dataState?:DataStateEnum,
    data?:T,
    errorMessage?:string;
}