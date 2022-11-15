import "./checkout_styles.scss";
import { useContext } from "react";
import {useSelector} from 'react-redux';
import { selectCartItems,selectCartTotal } from "../../cart/cart_selector";
// import { CartContext } from "../../context/cart_context";
import CheckoutItem from "../checkout-item/checkout_item_component";

const Checkout = () => {
  // const { cartItems,addItemToCart,removeItemFromCart ,total} = useContext(CartContext);
  const cartItems=useSelector(selectCartItems);
  const cartTotal=useSelector(selectCartTotal);
  return (
    <div className="checkout-container">
    <div className="checkout-header">
        <div className="header-blocks">
            <span>Product</span>
        </div>
        <div className="header-blocks">
            <span>Description</span>
        </div>  
        <div className="header-blocks">
            <span>Quantity</span>
        </div>  
        <div className="header-blocks">
            <span>Price</span>
        </div>  
        <div className="header-blocks">
            <span>Remove</span>
        </div> 
    </div>
      
    
        {cartItems.map((cartItem) => {
         
          return (
            <CheckoutItem key={cartItem.id} cartItem={cartItem}> </CheckoutItem>
          );
        })}
     <span className="total">Total:{cartTotal}</span>
    </div>
  );
};

export default Checkout;
