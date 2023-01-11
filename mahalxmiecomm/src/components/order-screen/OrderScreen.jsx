import { useState, useEffect } from "react";
import {
  useAsyncValue,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { selectCartTotal } from "../../cart/cart_selector";
import { createOrder, listMyOrders } from "../../actions/orderCreateAction";
import {
  Button,
  Row,
  ListGroup,
  Image,
  Card,
  Col,
  ListGroupItem,
} from "react-bootstrap";
import Loader from "../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../cart/cart_action";
import FormContainer from "../form-container/FormContainer";
import { Link } from "react-router-dom";
import Message from "../message/message";
import { clearCart } from "../../cart/cart_action";

import { getOrderDetails, payOrder } from "../../actions/orderCreateAction";
import { myOrderTypes } from "../../reducers/orderReducer";
function OrderScreen() {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const cartTotal = useSelector(selectCartTotal);
  const shippingPrice = (cartTotal > 100 ? 0 : 10).toFixed(2);
  const taxPrice = (0.082 * cartTotal).toFixed(2);
  const priceToPay =
    parseFloat(taxPrice) + parseFloat(cartTotal) + parseFloat(shippingPrice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const orderId = params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;


  
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce(
      (total, Item) => total + Item.quantity * Item.price,
      0
    );
  }

  useEffect(() => {
    if (!order  || order._id !== Number(orderId)) {
      dispatch({ type: myOrderTypes.ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
 
    }
  }, [order, orderId, dispatch]);



  return (
    <div>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                <strong>Name:</strong>
                {order.user.username}
              </p>
              <p>
                <strong>Email:</strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Shipping:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.state}
                {"  "}
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
                {order.isPaid ? (
                  <Message variant="success">
                    Delivered On {order.paidAt}
                  </Message>
                ) : (
                  <Message variant="warning">Not Delivered</Message>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              {order.paymentMethod}
              <p>
                {order.isPaid ? (
                  <Message variant="success">Paid On {order.paidAt}</Message>
                ) : (
                  <Message variant="warning">Not Paid</Message>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">
                  This is order with no orderItems
                </Message>
              ) : (
                <ListGroup variaint="flush">
                  {order.orderItems.map((item) => {
                    return (
                      <ListGroup.Item key={item._id}>
                        <Row>
                          <Col md={2}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {" "}
                              {item.name}{" "}
                            </Link>
                          </Col>

                          <Col md={4}>
                            {item.quantity} X ${item.price}=$
                            {(item.price * item.quantity).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Item:</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
             
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default OrderScreen;
