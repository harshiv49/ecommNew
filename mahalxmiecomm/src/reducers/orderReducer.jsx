export const myOrderTypes={
    ORDER_CREATE_REQUEST:'ORDER_CREATE_REQUEST',
    ORDER_CREATE_SUCCESS:'ORDER_CREATE_SUCCESS',
    ORDER_CREATE_FAIL:'ORDER_CREATE_FAIL',
    ORDER_CREATE_RESET:'ORDER_CREATE_RESET',
    ORDER_DETAILS_REQUEST:'ORDER_DETAILS_REQUEST',
    ORDER_DETAILS_SUCCESS:'ORDER_DETAILS_SUCCESS',
    ORDER_DETAILS_FAIL:'ORDER_DETAILS_FAIL'
}

export const orderCreateReducer=(state={},action)=>{
    const {type,payload}=action
    switch(type){
        case myOrderTypes.ORDER_CREATE_REQUEST:
            return{
                loading:true
            }
        case myOrderTypes.ORDER_CREATE_SUCCESS:
            return{
                loading:false,
                success:true,
                //state will be uploaded wth the payload of get request
                 order:payload
            }
        case myOrderTypes.ORDER_CREATE_FAIL:
            return{
                loading:false,
                error:payload
            }

        case myOrderTypes.ORDER_CREATE_RESET:
            return{}
        default:
            return state

    }
}


export const orderDetailsReducer=(state={loading:true,orderItems:[],shippingAddress:{}},action)=>{
    const {type,payload}=action
    switch(type){
        case myOrderTypes.ORDER_DETAILS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case myOrderTypes.ORDER_DETAILS_SUCCESS:
            return{
                loading:false,
                success:true,
                 order:payload
            }
        case myOrderTypes.ORDER_DETAILS_FAIL:
            return{
                loading:false,
                error:payload
            }
        default:
            return state

    }
}