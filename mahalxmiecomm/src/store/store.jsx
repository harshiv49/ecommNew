import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from  'redux-devtools-extension';
import logger from 'redux-logger'
import { productListReducer} from '../reducers/productReducers';
import { userLoginReducer, userRegisterReducer,userDetailsReducer,userUpdateProfileReducer,userListReducer } from '../reducers/userReducers';
import storage from 'redux-persist/lib/storage'
import { cartReducer } from '../cart/cart_reducer';
import {persistStore,persistReducer} from 'redux-persist'
import { productDetailsReducer } from '../reducers/productReducers';
import { orderCreateReducer,orderDetailsReducer, orderPayReducer } from '../reducers/orderReducer';
const persistConfig={
    key:'root',
    storage,

    //we can pass in a list of  reducers we dont wnat to persist blacklist:['user']
    blacklist:['orderCreate','productList','userLogin','userRegister','userDetails','userUpdateProfile']
}

const middleWares=[thunk,logger]
const reducer=combineReducers({
    productList:productListReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    cart:cartReducer,
    productDetails:productDetailsReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    userList:userListReducer

})

const persistedReducer=persistReducer(persistConfig,reducer)


const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null

const INITIAL_STATE={
    userLogin:{userInfo:userInfoFromStorage}
}
const store=createStore(persistedReducer,INITIAL_STATE,composeWithDevTools(applyMiddleware(...middleWares)))
export default store;
export const persistor=persistStore(store)