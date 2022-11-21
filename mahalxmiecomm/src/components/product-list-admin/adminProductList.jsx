import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row,Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, register } from "../../actions/userAction";
import FormContainer from "../form-container/FormContainer";
import { listProducts } from "../../actions/productActions";
import Loader from "../loader/loader";
import Message from "../message/message";

function  AdminProductListScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productList=useSelector(state=>state.productList);
  const {loading,error,products}=productList
  console.log('  mai hun giyan ',products)


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ypu wnat to delete this user?")) {
      //delete products 
      console.log('naah vro ')
    }
  };
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  const createProductHandler=(product)=>{
    //create Product 
    console.log('i am product handler ')
  }

  return (
    <div>
      <Row className='align-items-center'>
        <Col>
            <h1>Products</h1>
        </Col>
        <Col className='text-right'>
           <Button className="my-3" onClick={createProductHandler}> 
           <i className='fas fa-plus'></i>Create Product
           </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table stripped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
            </tr>
          </thead>

          <tbody>
         
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas  fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          
          </tbody>
        </Table>
      )}
    </div>
  );
}
export default AdminProductListScreen;
