import './cart_item_component.scss'
const CartItem=({cartItem})=>{
    const {name,price,quantity,imageUrl}=cartItem;
    return(
        <div className='cart-item-container'>
        <img src={imageUrl} alt={`${name}`}></img>
        <div className='item-details'>
        <span className='name'>{name}</span>
        <span className='price'>{quantity}*${price}</span>
        </div>
        
        </div>
    )
}
export default CartItem;