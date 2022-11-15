import {Row,Col,Image,Card,ListGroup,Button} from 'react-bootstrap';
import Rating from '../rating/rating_component';
import { useState,useEffect } from 'react';
import { listProductDetails } from '../../actions/productActions';
import {useDispatch,useSelector} from 'react-redux';
// import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
const ProductScreen=()=>{
    const params = useParams();
    const dispatch=useDispatch()
    // const [product,setProduct]=useState([]);
    useEffect(()=>{
    // async function fetchProduct(){
    //  const {data}=await axios.get(`/api/products/${params.id}`);
    //   setProduct(data);
    // }
    // fetchProduct();
    dispatch(listProductDetails(params.id))
},[dispatch])
   const productDetails=useSelector(state=>state.productDetail)
   console.log('i am product details ',productDetails)
   const {error,loading,product}=productDetails
    // const product = products.find((p) => p._id == params.id);
    const {imageUrl,id,name,price,description,rating,numReviews,countInStock}=product;
    // we can use parammetres which are dynamically passed in the URL by this useParams() method  const price=parseInt(params.price)+100; can also obvioulsy pass it in our html with return 
    return(
       <div>
       <Link to='/' className='btn btn-light my-3'> Go back </Link>
        <Row>
        <Col md={6}>
            <Image src={imageUrl} alt={`${name}`} fluid/>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                <div>{name}</div>
                </ListGroup.Item>
                <ListGroup.Item>
                <Rating value={rating} text={`${numReviews} reviews` } color={'#f8e825'}></Rating>
                </ListGroup.Item>
                <ListGroup.Item>
                <div>Price:{price}&#8377;</div>
                </ListGroup.Item>
                <ListGroup.Item>
                <div className='product-description'>Description:{description}</div>
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
           <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                <Row>
                    <Col>
                    Price:
                    <Col>
                    <strong> {price} &#8377;</strong>
                    </Col>
                    </Col>
                </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                <Row>
                    <Col>
                   Status:
                    <Col>
                    {countInStock>6?'In Stock':countInStock<6 && countInStock > 1 ?'RunningOutOfStock':countInStock == 1?'Only One Left':'Out of Stock'}
                    </Col>
                    </Col>
                </Row>
                </ListGroup.Item>
                
                <ListGroup.Item>
                <Button className='btn-block' disabled={countInStock==0} type='button'>ADD TO CART</Button>
                </ListGroup.Item>
            </ListGroup>
           </Card>
        </Col>
        </Row>
       </div>
    )
}
export default ProductScreen;