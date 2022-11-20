import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
import FormContainer from "../form-container/FormContainer";
import { listUsers } from "../../actions/userAction";
import Loader from "../loader/loader";
import Message from "../message/message";
function UserListScreen() {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  console.log("mai hun user", users);
  const userLogin = useSelector((state) => state.userList);
  const {userInfo}=userLogin
    const deleteHandler=()=>{
        console.log('hi and welcome to admin users delte')
    }
  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
        dispatch(listUsers());
    }
    else{
        navigate('/login')

    }
  
  }, [dispatch]);
  return (
    <div>
      <h1>Users</h1>
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
            <th>EMAIL</th>
            <th>ADMIN</th>
            </tr>
          </thead>
        
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-check" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                        <LinkContainer to={`/admin/user/${user._id}`}>
                            <Button variant='light' className='btn-sm'>
                           
                      <i className="fas fa-edit"></i>
                            </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={deleteHandler(user._id)}>
                        <i className='fas  fa-trash'></i>
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
export default UserListScreen;
