import { Fragment } from "react";
import "./footer_component_style.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import PaymentLogo from "../../assets/payment gateway.png";
import {Container,Row,Col} from 'react-bootstrap';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
const myStyle = {
    
    paddingLeft: "35px",
  
  };
const Footer = () => {
  return <Fragment>
  <Outlet/>
  <footer className="footer-section">
    <div class="footer-column1">
         <CrwnLogo className="logo"/>
        <h3>Contact</h3>
        <p><strong>Address1:</strong>Lg 40, Abhinandan Ac Market,Ghod Dod Road ,Near Rangilla Park, Surat</p>
        <p><strong>Address2:</strong>Lavanya Shopping Mall, Near Ashok Pan House, CityLight, Surat</p>
        <p><strong>Phone:</strong>9327047019</p>
        <p><strong>Hours:</strong>Morning:11:00am to 9:00pm </p>
        <div className="follow-section">
            <h3 className="followUs-heading">Follow Us</h3>
            <div className="follow-icon" >
               <Link to="https://www.whatsapp.com/" target="_blank"><i class="fa-brands fa-whatsapp"></i></Link>
               <Link to="https://www.instagram.com/" target="_blank"><i class="fa-brands fa-instagram"></i></Link> 
               <Link  to="https://www.facebook.com/" target="_blank"><i class="fa-brands fa-facebook"></i></Link>
            </div>
        </div>

    </div>
   
    <div  className="footer-column2">
        <h4 className="footer-subheadings">About</h4>
        <ul>
        <li><Link to="#">About Us</Link></li>
        <li><Link to="#">Delivery Informations</Link></li>
        <li><Link to="#">Privacy Policy</Link></li>
        <li><Link to="#">Terms and Conditions</Link></li>
        <li><Link to="#">Contact Us </Link></li>
    </ul>

    </div>

    <div  className="footer-column2" >
        <h4 className="footer-subheadings">My account </h4>
        <ul>
        <li><Link to="#" >Sign In</Link></li>
        <li><Link to="#">View Cart</Link></li>
        <li><Link to="#">My WishList</Link></li>
        <li><Link to="#">Track My orders</Link></li>
        <li><Link to="#">Helps</Link></li>
    </ul>

    </div>

    
    <div  className="footer-column2 payment">
        <h4  className="footer-subheadings">Payments</h4>
        <p style={myStyle}>Secured Payment Gateways</p>
        <img src={PaymentLogo} className="payment-logo" alt='payment-logo'></img>
    </div>

    
</footer>
<Container>
      <Row>
        <Col className="text-center">Copyright &copy; Mahalaxmi Matching Center</Col>
      </Row>
    </Container>
  </Fragment>;
};
export default Footer;
