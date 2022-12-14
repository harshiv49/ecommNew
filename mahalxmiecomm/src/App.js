import Home from "./routes/home/home_component";
import { Routes, Route } from "react-router-dom";
import "./bootstrap.min.css";
import Navigation from "./routes/navigation/navigation_component";
import ProductScreen from "./components/product-view/product_view_component";
import Shop from "./routes/shop/shop_component";
import Checkout from "./routes/checkout/checkout_component.jsx";
import LoginScreen from "./components/login-screen/loginScreen";
import RegisterScreen from "./components/register-screen/registerScreen";
import ProfileScreen from "./components/profile-screen/ProfileScreen";
import ShippingScreen from "./components/shipping-screen/ShippingScreen";
import PaymentScreen from "./components/payment-screen/PaymentScreen";
import PlaceOrder from "./components/place-order/PlaceOrderScreen";
import OrderScreen from "./components/order-screen/OrderScreen";
import UserListScreen from "./components/user-login/userListScreen";
import EditUserScreen from "./components/user-admin-edit/userEdit";
import AdminProductListScreen from "./components/product-list-admin/adminProductList";
import EditProductScreen from "./components/product-edit/productEditScreen";
import AdminOrderListScreen from "./components/order-admin-list/orderAdminScreen";
function App() {
  //we use Routes to wrap anything that is routable inside this app component
  //Route is a component which renders a specific component if it matches the path

  //index true will render the component on the route of the parent component
  return (
    <Routes>
      <Route path="/" element={<Navigation></Navigation>}>
        <Route index={true} element={<Home></Home>} />
        <Route path="shop" element={<Shop></Shop>}></Route>
        <Route path="checkout" element={<Checkout></Checkout>} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
        <Route path="profile" element={<ProfileScreen />} />
        <Route path="payment" element={<PaymentScreen />} />
        <Route path="shipping" element={<ShippingScreen />} />
        <Route path="placeorder" element={<PlaceOrder></PlaceOrder>} />
        <Route path="order/:id" element={<OrderScreen />} />
      <Route path="admin/userList" element={<UserListScreen />} />
      <Route path="products/:id" element={<ProductScreen />} />
      <Route path="admin/user/:id/edit" element={<EditUserScreen />} />
      <Route path="admin/productList" element={<AdminProductListScreen/>} />
      <Route path="admin/orderList" element={<AdminOrderListScreen/>} />
      <Route path="admin/product/:id/edit" element={<EditProductScreen />} />
      </Route>
    </Routes>
  );
}
export default App;
