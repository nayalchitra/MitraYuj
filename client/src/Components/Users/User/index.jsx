import { Button, Col } from 'react-bootstrap';
import React from 'react'
import Card from 'react-bootstrap/Card';
import "./style.css";
import { useDispatch, useSelector } from 'react-redux';
import { addFriendActionCreator, removeFriendActionCreator } from '../../../reducers/userReducer';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';


export default function User({userData}) {
  const {friendList, username} = useSelector(({users})=>users);

  const navigate = useNavigate();

  const { id, firstName, lastName, picture, title} = userData;
  const fullName = `${title} ${firstName} ${lastName}`
  
  console.log({friendList})
  const isFriend = friendList && friendList.includes(id);

  const dispatch = useDispatch();

  const addFriend = ()=>{

    if(!username){
        navigate('/login', {state:{redirectTo:'/'}});
    }
    const payload = {
      
      id,
      name: `${firstName} ${lastName}`

    }  
    dispatch(addFriendActionCreator(payload));
  }

  const removeFriend = ()=>{
    const payload = {
      
      id,
      name: `${firstName} ${lastName}`

    }

    dispatch(removeFriendActionCreator(payload));
  }

  return (
               <Col md={5}  lg={4} sm={6} xl={3}>
                     <Card>
                    <Card.Body>
                            <img className='profile' src={picture} alt='user'></img>
                            <div className=''>
                                <Card.Title>{fullName}</Card.Title>
                                {
                                  isFriend ?
                                  <Button variant='danger' onClick={removeFriend}>Remove Friend</Button>
                                  :
                                  <Button onClick={addFriend}>Add Friend</Button>
                                }
                            </div>
                            
                    </Card.Body>
                </Card>
               </Col>
  )
}
