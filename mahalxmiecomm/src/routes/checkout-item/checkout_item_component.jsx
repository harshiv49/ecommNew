import './checkout_item_styles.scss'
import { useSelector,useDispatch } from 'react-redux';
import { selectCartItems } from '../../cart/cart_selector';
import {addItemToCart,clearItemFromCart,removeItemFromCart} from '../../cart/cart_action';
// import { useContext } from 'react';
// import { CartContext } from '../../context/cart_context';
const CheckoutItem=({cartItem})=>{
    const {id,name,imageUrl,price,quantity}=cartItem;
    // const {clearItemFromCart,addItemToCart,removeItemFromCart}=useContext(CartContext);
    const cartItems=useSelector(selectCartItems)
    const dispatch=useDispatch()
    const clearItemHandler=()=>dispatch(clearItemFromCart(cartItems,cartItem));
    const addItemHandler=()=>dispatch(addItemToCart(cartItems,cartItem));
    const removeItemHandler=()=>dispatch(removeItemFromCart(cartItems,cartItem));
    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
            <img src={imageUrl} alt={`${name}`}></img>
            </div>
            <span className='name'>{name}</span>
           
            <span className='quantity'>
            <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
            <span className='value'>{quantity}</span>
            <div className='arrow' onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
           
        </div>
        
    )

}
export default CheckoutItem;