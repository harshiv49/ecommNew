import axios from 'axios'
import { myOrderTypes } from '../reducers/orderReducer'

export const createOrder = (order) => async (dispatch,getState) => {
        try {
          const {userLogin:{userInfo}}=getState()
      
      
          const config={
            
              headers:{
              // we need to send the authorization headers as our /users/profile is a restriccetd route for authenticated users only
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}` 
              }
          }
      
          dispatch({ type: myOrderTypes.ORDER_CREATE_REQUEST });
          const { data } = await axios.post(
            //url left in django 
              `/api/orders/add/`,
              order,
              config
          );
        
          dispatch({
            type: myOrderTypes.ORDER_CREATE_SUCCESS,
            payload: data,
          });   

                 
        } 
        catch (error) {
          dispatch({
            type:myOrderTypes.ORDER_CREATE_FAIL,
            payload:
              error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
          });
        }
      };


 export const getOrderDetails = (id) => async (dispatch,getState) => {
        console.log('mai hun id ',id)
        try {
          const {userLogin:{userInfo}}=getState()
          const config={
              headers:{
              // we need to send the authorization headers as our /users/profile is a restriccetd route for authenticated users only
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}` 
              }
          }
      
          dispatch({ type: myOrderTypes.ORDER_DETAILS_REQUEST });
          
          const { data } = await axios.get(`/api/orders/${id}/`,config);
        
          dispatch({
            type: myOrderTypes.ORDER_DETAILS_SUCCESS,
            payload: data,
          });   


        } 
        catch (error) {
          dispatch({
            type:myOrderTypes.ORDER_DETAILS_FAIL,
            payload:
              error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
          });
        }
      };
      
