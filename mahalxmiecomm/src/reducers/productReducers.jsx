
export const myActionsProductList={

    REQUEST:'PRODUCTS_LIST_REQUEST',
    SUCCESS:'PRODUCTS_LIST_SUCCESS',
    FAIL:'PRODUCTS_LIST_FAIL',
    DETAILS_REQUEST:'PRODUCTS_DETAILS_REQUEST',
    DETAILS_SUCCESS:'PRODUCTS_DETAILS_SUCCESS',
    DETAILS_FAIL:'PRODUCTS_DETAILS_FAIL'   

}

export const productListReducer=(state={products:[]},action)=>{
    
    const {type,payload}=action 
    switch (type){
        case myActionsProductList.REQUEST:
            return {loading:true,products:[]}
        case myActionsProductList.SUCCESS :
           
            return {loading:false,products:payload}
        case myActionsProductList.FAIL:
            return {loading:false,error:payload}
        default:
            return state
    }
    
}


export const productDetailsReducer=(state={product:{reviews:[]}},action)=>{
    
    const {type,payload}=action 
    switch (type){
        case myActionsProductList.DETAILS_REQUEST:
            return {loading:true,...state}
        case myActionsProductList.DETAILS_SUCCESS :
           
            return {loading:false,product:payload}
        case myActionsProductList.DETAILS_FAIL:
            return {loading:false,error:payload}
        default:
            return state
    }
    
}