import { myActionsProductList } from "../reducers/productReducers";

import axios from 'axios';
export const listProducts=()=>async (dispatch)=>{
    try{
        dispatch({loading:true,type:'PRODUCTS_LIST_REQUEST'})
        const {data}=await axios.get('/api/products')
        dispatch({loading:false,type:'PRODUCTS_LIST_SUCCESS',payload:data})
    }
    catch(error){
        dispatch({laoding:false,type:'PRODUCTS_LIST_FAIL',payload:error.response&&error.response.data.detail?error.response.data.detail:error.message})
    }
}

export const listProductDetails=(id)=>async (dispatch)=>{
   
    try{
        dispatch({loading:true,type:'PRODUCTS_DETAILS_REQUEST'})
        const {data}=await axios.get(`/api/products/${id}`)
        dispatch({loading:false,type:'PRODUCTS_DETAILS_SUCCESS',payload:data})
    }
    catch(error){
        dispatch({laoding:false,type:'PRODUCTS_DETAILS_FAIL',payload:error.response&&error.response.data.detail?error.response.data.detail:error.message})
    }
}