import { useState,useEffect } from 'react';
import { useLocation,useNavigate,Link } from 'react-router-dom';
import {Form,Button,Row,Col} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import { register } from '../../actions/userAction';
import Message from '../message/message';
import Loader from '../loader/loader';
import FormContainer from '../form-container/FormContainer';
import { getUserDetails,updateUserProfile } from '../../actions/userAction';
import { myActionsUsers } from '../../reducers/userReducers';
function ProfileScreen(){
    const location = useLocation()
    const navigate = useNavigate()
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const [confirmPassword,setconfirmPassword]=useState('')
    const[message,setMessage]=useState('')
    //event handler runs when form is submitted
    const submitHandler=(e)=>{
        
        e.preventDefault()
        if (password!=confirmPassword){
            setMessage('passwords do not match')
        }
        else{
            dispatch(updateUserProfile(
                {
                    'id':user._id,
                    'name':name,
                    'email':email,
                    'password':password
                }
            ))
        }

        
        
    }
    //above function is important 


    const dispatch=useDispatch()
    //the url where we want to redirect
 
    //bring the initial state passed in the user reducer 
    const userDetails=useSelector(state=> state.userDetails)
    const {error , loading ,user}=userDetails


    const userLogin=useSelector(state=> state.userLogin)
    const {userInfo}=userLogin

    const userUpdateProfile=useSelector(state=> state.userUpdateProfile)
    const {success}=userUpdateProfile



    //if userinfo exxist we wan to redirect
    useEffect(() => {
        //if there is no userInfo that is the user is not logged in so we send the user to login page 
        if(!userInfo) {
            navigate('/login')
        }
        else{
            if(!user || !user.name || success){
                dispatch({type:myActionsUsers.PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            }
            else{
                setName(user.name)
                setEmail(user.email) 
            }
        }   
    }, [navigate, userInfo,dispatch])
    return(
        <Row>
            <Col md={3}>
            <h2>User Profile</h2>
           { message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label>NAME:</Form.Label>
                    <Form.Control 
                    required
                    type='name'
                    placeholder='Enter Username'
                    value={name}
                    onChange={(event)=>setName(event.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>EMAIL:</Form.Label>
                    <Form.Control 
                    required
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                    ></Form.Control>
                </Form.Group>
                
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    required
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                    required
                    type='Confirm password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(event)=>setconfirmPassword(event.target.value)}
                    ></Form.Control>
                </Form.Group>
            <Button type='submit' variant='primary'>UPDATE</Button>
            </Form>

            </Col>

            <Col md={9}>
            <h2>My Orders</h2>
            </Col>
            
        </Row>
    )
}

export default ProfileScreen;