import { Outlet,Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
// import { CartContext } from "../../context/cart_context";
import { selectIsCartOpen } from "../../cart/cart_selector";
import './navigation_styles.scss' 
import { NavDropdown } from "react-bootstrap";
import CartIcon from "../../components/cart-icon/cart_icon_component";
import CartDropDown from "../../components/cart-dropdown/cart_dropdown_component";
import { useDispatch,useSelector } from "react-redux";
import {LinkContainer} from 'react-router-bootstrap';
import { logout } from "../../actions/userAction";
const  Navigation=()=>{  
    // const {isCartOpen}=useContext(CartContext)
    const isCartOpen=useSelector(selectIsCartOpen)
    const userLogin=useSelector(state=>state.userLogin)
    const dispatch=useDispatch()
    const logoutHandler=()=>{
      dispatch(logout())
    }
    const {userInfo}=userLogin
    //we can import svg file images as components 
    return(
     <Fragment>
       <div className="navigation">
         <Link className="logo-container" to="/">
               <CrwnLogo className="logo"/>
         </Link>
         <div className="nav-links-container">
         <Link className="nav-link" to='/shop'>
         SHOP
         </Link>
         {userInfo?(
          <NavDropdown id='username' title={userInfo.name}>
              <LinkContainer to='/profile'>
               <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>LOGOUT</NavDropdown.Item>
          </NavDropdown>
            
         ):(
          <Link className="nav-link" to='/login'>
         SIGN IN 
         </Link>
         )
        }

        {userInfo&&userInfo.isAdmin?(
          <NavDropdown id='admin-menu' title='Admin'>
              <LinkContainer to='/admin/userList'>
               <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/productList'>
               <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/orderList'>
               <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
          </NavDropdown>
            
         ):(
          <Link className="nav-link" to='/login'>
         SIGN IN 
         </Link>
         )
        }
         
         <CartIcon/>

         </div>
    {  isCartOpen && <CartDropDown></CartDropDown>}
       </div>
       <Outlet/>
     </Fragment>
    );
}
export default Navigation;