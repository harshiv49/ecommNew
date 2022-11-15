import './product_card_styles.scss';
import {useNavigate} from 'react-router-dom';
import Button from '../button/button_component';
import { useDispatch,useSelector } from 'react-redux';
import { selectCartItems } from '../../cart/cart_selector';
import { addItemToCart } from '../../cart/cart_action';
// import { CartContext } from '../../context/cart_context';
// import { useContext } from 'react';
import Rating from '../rating/rating_component';
const ProductCard=({product})=>{
   
    const {name,price,imageUrl,rating,numReviews,id}=product;
    // const {addItemToCart}=useContext(CartContext);
    const cartItems=useSelector(selectCartItems)
    const dispatch=useDispatch()
    const addProductToCart=()=>dispatch(addItemToCart(cartItems,product))
    const navigate=useNavigate();
    const goToProductViewHandler=()=>{
        //only thing that seperates absolute path in react to relative path is the /  
        navigate(`/api/products/${id}`);
    }
    return(
    <div className='product-card-container'>
 {/*change imagUrl to image */}
        <img src={imageUrl} alt={`${name}`}/>
        <div className='footer'> 
        <div>
    
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
            </div>
            <Rating value={rating} text={`${numReviews} reviews` } color={'#f8e825'}></Rating>
         
        </div>    
       
            <Button buttonType='inverted' onClick={()=>addProductToCart(product)}>ADD TO CART</Button>
            {/* TRY TO MAKE VIEW IN A CIRCLE WITH AN EYE*/}
            <Button buttonType='circle' onClick={goToProductViewHandler}>VIEW</Button>
    </div>
    );
}

export default ProductCard;