import { Row, Col, Image, Card, ListGroup, Button } from "react-bootstrap";
import Rating from "../rating/rating_component";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import {
  listProductDetails,
  createProductReview,
} from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { myActionsProductList } from "../../reducers/productReducers";
import { Link, useParams } from "react-router-dom";
import Message from "../message/message";
import Loader from "../loader/loader";
import { Form } from "react-bootstrap";
const ProductScreen = () => {
  const [ratings, setRatings] = useState(0);
  const [comment, setComment] = useState("");
  // we can use parametres which are dynamically passed in the URL by this useParams() method  const price=parseInt(params.price)+100; can also obvioulsy pass it in our html with return
  const params = useParams();
  const productId=params.id
  console.log('id',productId)
  const dispatch = useDispatch();
  // const [product,setProduct]=useState([]);
  
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;
  useEffect(() => {
    // async function fetchProduct(){
    //  const {data}=await axios.get(`/api/products/${params.id}`);
    //   setProduct(data);
    // }
    // fetchProduct();
    if(successProductReview){
        setRatings(0)
        setComment('')
        dispatch({type:myActionsProductList.CREATE_REVIEW_RESET})
    }

    dispatch(listProductDetails(productId))
  }, [dispatch,productId,successProductReview])
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const product = products.find((p) => p._id == params.id);
  const {
    image,
    _id,
    name,
    price,
    description,
    rating,
    reviews,
    numReviews,
    countInStock,
  } = product;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(_id,{
        rating:ratings,
        comment:comment,
    }))
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        {" "}
        Go back{" "}
      </Link>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Row>
            <Col md={6}>
              <Image src={image} alt={`${name}`} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div>{name}</div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={rating}
                    text={`${numReviews} reviews`}
                    color={"#f8e825"}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div>Price:{price}&#8377;</div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="product-description">
                    Description:{description}
                  </div>
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
                          {countInStock > 6
                            ? "In Stock"
                            : countInStock < 6 && countInStock > 1
                            ? "RunningOutOfStock"
                            : countInStock == 1
                            ? "Only One Left"
                            : "Out of Stock"}
                        </Col>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      disabled={countInStock == 0}
                      type="button"
                    >
                      ADD TO CART
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h4>Reviews</h4>
              {reviews.length === 0 && (
                <Message variant="info">No reviews</Message>
              )}
              <ListGroup variant="flush">
                {reviews.map((review) => {
                  return (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} color="#f8e825"></Rating>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  );
                })}

                <ListGroup.Item>
                  <p
                    style={{
                      fontSize: "27px",
                    }}
                  >
                    Write a review?
                  </p>
                    {loadingProductReview && <Loader></Loader>}
                    {successProductReview&&<Message variant='success'>Review Submitted</Message>}
                    {errorProductReview&&<Message variant='danger'>{errorProductReview}</Message>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={ratings}
                          onChange={(e) => setRatings(e.target.value)}
                        >
                          <option value="">Select....</option>
                          <option value="1">1 Poor...</option>
                          <option value="2">2 Fair</option>
                          <option value="3">3 Average</option>
                          <option value="4">4 Good</option>
                          <option value="5">5 Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                        as="textarea"
                        row="5"
                        value={comment}
                        onChange={(e)=>setComment(e.target.value)}>
                        </Form.Control>
                      </Form.Group>
                      <Button 
                      //diabled while review is being sent 
                      disabled={loadingProductReview}
                      type='submit'
                      varinat='primary'
                      > 
                      Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      PLease<Link>login</Link>to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Fragment>
      )}
    </div>
  );
};
export default ProductScreen;
